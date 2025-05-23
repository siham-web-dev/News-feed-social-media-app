/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import { Form as CForm } from "../ui/form";
import CustomFormField from "./FormField";
import SubmitButton from "./SubmitButton";
import { InputType } from "@/lib/types/form";
import useMessages from "@/lib/hooks/useMessages";
import { useTransition } from "react";
import { ActionResult } from "@/lib/types/response";

type FormProps = {
  fields: InputType[];
  form: UseFormReturn<any, any, undefined>;
  callBack: (dto: any) => Promise<ActionResult>;
  submitText: string;
  width?: "full" | "fit";
};

const Form: React.FC<FormProps> = ({
  fields,
  form,
  callBack,
  submitText,
  width = "full",
}) => {
  const [isPending, startTransition] = useTransition();
  const { showMessage } = useMessages();

  const onSubmit = (values: any) => {
    startTransition(async () => {
      const { error, success } = await callBack(values);
      if (error) {
        showMessage(error, "error");
      } else if (success) {
        showMessage(success, "success");
      }
    });
  };

  return (
    <CForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full gap-3.5 flex flex-col"
        method="post"
      >
        {fields.map((field) => (
          <div key={field.id}>
            <CustomFormField {...field} control={form.control} />
          </div>
        ))}
        <SubmitButton
          width={width}
          disabled={isPending}
          text={isPending ? `${submitText}...` : `${submitText}`}
        />
      </form>
    </CForm>
  );
};

export default Form;
