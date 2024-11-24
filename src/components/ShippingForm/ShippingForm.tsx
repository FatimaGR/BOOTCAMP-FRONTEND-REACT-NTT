import { FC, useState } from "react";
import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import { ShippingData } from "../../domain/interfaces";
import { useJson } from "../../shared/hooks/useJson";
import SelectOption from "../../shared/SelectOption/SelectOption";
import { validateNumber, validateStrings } from "../../shared/utils/utils";

interface ShippingFormProps {
  openModal: () => void,
}

const ShippingForm: FC<ShippingFormProps> = ({openModal}) => {
  const { data } = useJson<{ districts: string[] }>("/data/districts.json");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    district: "",
    address: "",
    reference: "",
    phoneNumber: "",
  });

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});

    let newErrors: {[key: string]: string} = {...errors};

    if (!value){
      newErrors[name] = "This value is required";
    } else {
      if (name === "firstName" || name === "lastName"){
        if (!validateStrings(value)){
          newErrors[name] = "Enter a value only with letters";
        } else {
          delete newErrors[name];
        };
      } else if (name === "phoneNumber"){
        if (!validateNumber(value)){
          newErrors[name] = "Enter a value only with numbers";
        } else {
          delete newErrors[name];
        };
      } else {
        delete newErrors[name];
      };
    };
    
    setErrors(newErrors);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let newErrors: {[key: string]: string} = {...errors};

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof ShippingData]){
        newErrors[key] = "This value is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0){
      console.log(formData);
      openModal();
    };
  };

  return(
    <form onSubmit={handleSubmit}>
      <p>Shipping Information</p>
      <div>
        <Input
          firstContainerClassName=""
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          label="First name"
          type="text"
          error={errors.firstName}
        />
        <Input
          firstContainerClassName=""
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          label="Last name"
          type="text"
          error={errors.lastName}
        />
        <label htmlFor="district">Distric</label>
        <select value={formData.district} id="district" name="district" onChange={handleChange}>
          <SelectOption value="" text="Select your district" disabled/>
          {data?.districts.map((district, index) => (
            <SelectOption key={index} text={district} value={district}/>
          ))}
        </select>
        {errors.district && <p>{errors.district}</p>}
        <Input
          firstContainerClassName=""
          onChange={handleChange}
          name="address"
          value={formData.address}
          placeholder="Enter your address"
          label="Address"
          error={errors.address}
        />
        <Input
          firstContainerClassName=""
          onChange={handleChange}
          name="reference"
          value={formData.reference}
          placeholder="Address reference"
          label="Refence"
          error={errors.reference}
        />
        <Input
          firstContainerClassName=""
          onChange={handleChange}
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          label="Phone number"
          type="tel"
          error={errors.phoneNumber}
        />
      </div>
      <Button type="submit" text="Buy"/>
    </form>
  )
};

export default ShippingForm;