"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSektion = ({ event }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [submitError, setSubmitError] = useState(null);

  const availableTickets = event.totalTickets - event.bookedTickets;

  const onSubmit = async (data) => {
    if (data.tickets > availableTickets) {
      setSubmitError("Der er ikke nok billetter tilgængelige.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/events/${event.id}/book`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: event.id,
            tickets: parseInt(data.tickets),
          }),
        }
      );

      console.log("Status:", response.status);

      if (!response.ok) throw new Error("Fejl ved booking");

      localStorage.setItem(
        "bookingConfirmation",
        JSON.stringify({
          event: event,
          tickets: parseInt(data.tickets),
        })
      );

      router.push("/booking-bekraeftelse");
    } catch (err) {
      console.error(err);
      setSubmitError("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-white space-y-4"
    >
      <div>
        <label className="block ">Navn</label>
        <input
          {...register("name", { required: "Navn er påkrævet" })}
          className="bg-white text-black p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block ">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email er påkrævet",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Ugyldig email",
            },
          })}
          className="bg-white text-black p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block ">Antal billetter</label>
        <input
          type="number"
          {...register("tickets", {
            required: "Angiv antal billetter",
            min: { value: 1, message: "Minimum 1 billet" },
            max: {
              value: availableTickets,
              message: `Max ${availableTickets} billetter tilgængelige`,
            },
          })}
          className="bg-white text-black p-2"
        />
        {errors.tickets && (
          <p className="text-red-500">{errors.tickets.message}</p>
        )}
      </div>

      {submitError && <p className="text-red-500">{submitError}</p>}

      <button
        type="submit"
        className="bg-white text-black px-4 py-2 font-bold cursor-pointer"
      >
        Bekræft booking
      </button>
    </form>
  );
};

export default FormSektion;
