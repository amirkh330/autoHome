import React, { useState } from "react";
import { TAnnouncement, TUnit } from "./managerNotification.type";
import { useForm } from "react-hook-form";

const initialUnits: TUnit[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `واحد ${i + 1}`,
}));
export const userManagerNotification = () => {
  const [announcements, setAnnouncements] = useState<TAnnouncement[]>([]);

  const { register, handleSubmit, reset } = useForm<{
    title: string;
    description: string;
  }>({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = (data: { title: string; description: string }) => {
    const newAnn: TAnnouncement = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      seenBy: [], // هنوز هیچ واحدی مشاهده نکرده
    };
    setAnnouncements([newAnn, ...announcements]);
    reset();
  };

  return { announcements, register, handleSubmit, onSubmit };
};
