import { FC, useState } from "react";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import { ShippingData } from "../../domain/interfaces";
import { useJson } from "../../shared/hooks/useJson";
import { validateNumber, validateStrings } from "../../shared/utils/utils";
import { useCart } from "../../context/cart-context";
import Select from "../../shared/components/Select/Select";

interface ShippingFormProps {
  openModal: () => void,
}

const ShippingForm: FC<ShippingFormProps> = ({openModal}) => {
  const { cartProductsCounter } = useCart().state;
  const { data } = useJson<{ districts: string[] }>("/data/districts.json");
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});
  const [confirmedInputs, setConfirmedInputs] = useState<{[key: string]: boolean}>({});
  const [formError, setFormError] = useState("");
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

    let newErrors: {[key: string]: string} = {...inputErrors};
    let newConfirmedInputs: {[key: string]: boolean} = {...confirmedInputs};

    if (!value){
      newErrors[name] = "This value is required";
      newConfirmedInputs[name] = false;
    } else {
      if (name === "firstName" || name === "lastName"){
        if (!validateStrings(value)){
          newErrors[name] = "Enter a value only with letters";
          newConfirmedInputs[name] = false;
        } else {
          delete newErrors[name];
          newConfirmedInputs[name] = true;
        };
      } else if (name === "phoneNumber"){
        if (!validateNumber(value)){
          newErrors[name] = "Enter a value only with numbers";
          newConfirmedInputs[name] = false;
        } else {
          delete newErrors[name];
          newConfirmedInputs[name] = true;
        };
      } else {
        delete newErrors[name];
        newConfirmedInputs[name] = true;
      };
    };
    
    setInputErrors(newErrors);
    setConfirmedInputs(newConfirmedInputs);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let newErrors: {[key: string]: string} = {...inputErrors};
    let newConfirmedInputs: {[key: string]: boolean} = {...confirmedInputs};

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof ShippingData]){
        newErrors[key] = "This value is required";
        newConfirmedInputs[key] = false;
      }
    });

    setInputErrors(newErrors);
    setConfirmedInputs(newConfirmedInputs);

    if (Object.keys(newErrors).length === 0){
      if (cartProductsCounter === 0){
        setFormError("To complete the order, you need buy products.");
      } else {
        console.log(formData);
        openModal();
        document.body.classList.add("body-no-scroll");
      }
    };
  };

  return(
    <form onSubmit={handleSubmit}>
      <p className="form-title">Shipping Information</p>
      <div className="form-inputs">
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          label="First name"
          type="text"
          error={inputErrors.firstName}
          confirmed={confirmedInputs.firstName}
        />
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          label="Last name"
          type="text"
          error={inputErrors.lastName}
          confirmed={confirmedInputs.lastName}
        />
        <Select 
          options={data?.districts.map((district) => ({
              value: district,
              text: district
          }))}
          containerClassName="form-select"
          label="District"
          value={formData.district}
          id="district"
          name="district"
          onChange={handleChange}
          defaultValue=""
          defaultValueText="Select your district"
          defaultValueDisabled={true}
          error={inputErrors.district}
          confirmed={confirmedInputs.district}
        />
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="address"
          value={formData.address}
          placeholder="Enter your address"
          label="Address"
          error={inputErrors.address}
          confirmed={confirmedInputs.address}
        />
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="reference"
          value={formData.reference}
          placeholder="Address reference"
          label="Refence"
          error={inputErrors.reference}
          confirmed={confirmedInputs.reference}
        />
        <Input
          firstContainerClassName="form-input"
          onChange={handleChange}
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          label="Phone number"
          type="tel"
          error={inputErrors.phoneNumber}
          confirmed={confirmedInputs.phoneNumber}
        />
      </div>
      {formError && <p>{formError}</p>}
      <Button type="submit" text="Buy" className="form-button"/>
    </form>
  )
};

export default ShippingForm;