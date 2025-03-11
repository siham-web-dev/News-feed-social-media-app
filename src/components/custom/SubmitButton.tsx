import { Button } from "../ui/button";

type SubmitButtonProps = {
  disabled: boolean;
  width: "full" | "fit";
  text: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  width,
  text,
}) => {
  return (
    <>
      <Button type="submit" disabled={disabled} className={`w-${width}`}>
        {text}
      </Button>
    </>
  );
};

export default SubmitButton;
