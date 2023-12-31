import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  progDiff: {
    expDiff: number
    rankDiff: number
  }
}

const LostRankModal = ({ isOpen, onOpenChange, progDiff }: Props) => {
  const didLoseRank = progDiff.rankDiff > 0
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {didLoseRank ? `You've been demoted!` : `You've lost ${progDiff.expDiff} rank exp!`}
            </ModalHeader>
            <ModalBody>
              <p>Make sure to complete your dailies to prevent this from happening!</p>
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

export default LostRankModal
