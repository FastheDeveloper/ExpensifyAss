import React, {
  useEffect,
  useState,
  useContext,
  ReactNode,
  ComponentType,
  useRef,
  useCallback,
} from 'react';
import {
  BackHandler,
  InteractionManager,
  Keyboard,
  Modal,
  View,
  StyleSheet,
  NativeEventSubscription,
  Platform,
  ModalProps,
} from 'react-native';

export const ModalsContext =
  React.createContext <
  TWithModal >
  {
    openModal: () => console.warn('openModal must be overriden'),
    closeModal: () => console.warn('closeModal must be overriden'),
    closeModalNoCallbackAction: () => console.warn('closeModal must be overriden'),
  };

/**
 * ModalsProvider component that handles state and callbacks for modals.
 * Provides openModal and closeModal functions via context.
 * Renders modal overlay based on state.
 */
export const ModalsProvider = React.memo((props) => {
  const backHandler = useRef();
  const [state, setState] =
    useState <
    StateModal >
    {
      isVisible: false,
      component: <View />,
      modalOptions: {
        transparent: false,
        onCloseCb: undefined,
        showCloseButton: true,
        animationType: 'slide',
        modalConfig: {},
      },
    };

  const openModal = useCallback((component, modalOptions) => {
    Keyboard.dismiss();
    setState({
      isVisible: true,
      component,
      modalOptions,
    });
  }, []);

  const closeModal = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setState({
        ...state,
        isVisible: false,
      });
      if (modalOptions?.onCloseCb) {
        modalOptions.onCloseCb();
      }
    });
  }, []);

  const closeModalNoCallbackAction = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setState({
        ...state,
        isVisible: false,
      });
    });
  }, []);

  const { component, isVisible, modalOptions } = state;

  useEffect(() => {
    if (isVisible && Platform.OS === 'android') {
      const backAction = () => {
        closeModal();
        return true;
      };
      backHandler.current = BackHandler.addEventListener('hardwareBackPress', backAction);
    }
    return () => {
      backHandler.current?.remove();
    };
  }, [isVisible]);

  return (
    <ModalsContext.Provider
      value={{
        openModal,
        closeModal,
        closeModalNoCallbackAction,
      }}>
      {props.children}
      <Modal
        animationType={modalOptions?.animationType}
        transparent={modalOptions?.transparent}
        visible={isVisible}
        {...modalOptions?.modalConfig}>
        <View style={s.modalContent}>{component}</View>
      </Modal>
    </ModalsContext.Provider>
  );
});

export const useModalService = () => {
  const context = React.useContext(ModalsContext);

  if (!context) {
    throw new Error("Couldn't find Modal Provider");
  }
  return context;
};

const s = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
});

export function withModal(WrappedComponent) {
  const ComponentWithExtraInfo = (props) => {
    const { openModal, closeModal, closeModalNoCallbackAction } = useContext(ModalsContext);
    // At this point, the props being passed in are the original props the component expects.
    return (
      <WrappedComponent
        {...props}
        openModal={openModal}
        closeModal={closeModal}
        closeModalNoCallbackAction={closeModalNoCallbackAction}
      />
    );
  };
  return ComponentWithExtraInfo;
}
