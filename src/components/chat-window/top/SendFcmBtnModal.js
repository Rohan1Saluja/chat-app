import React, { useCallback, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import { functions } from "../../../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("Title is required"),
  message: StringType().isRequired("Message body is required"),
});

const INITIAL_FORM = {
  title: "",
  message: "",
};

// !------------------------------ Export Function ------------------------------
// TODO:---------------- Logic ----------------
// TODO:---------------------------------------

const SendFcmBtnModal = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);

  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  // ?-------------------- On Submit --------------------
  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    try {
      const sendFcm = functions.httpsCallable("sendFcm");
      await sendFcm({ chatId, ...formValue });
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      Alert.info("Notification has been sent", 7000);
    } catch (err) {
      Alert.error(err.message, 7000);
    }
  };

  // TODO:---------------- Logic ----------------
  // TODO:---------------------------------------

  return (
    <>
      <Button appearance="primary" size="xs" onClick={open}>
        <Icon icon="podcast" /> Broadcast Message
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Send notification to room users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl name="title" placeholder="Enter message title..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Message</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="message"
                placeholder="Enter notification message..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Publish Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
// !-----------------------------------------------------------------------------

export default SendFcmBtnModal;
