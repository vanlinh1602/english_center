import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  title,
  description,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Confirm your action</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{description}</div>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
