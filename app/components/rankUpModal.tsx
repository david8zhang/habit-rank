import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'

export interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

const RankUpModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <p>{`Congratulations, you've ranked up!`}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  onClose()
                }}
              >
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default RankUpModal
