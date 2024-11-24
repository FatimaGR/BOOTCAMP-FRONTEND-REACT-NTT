import { FC } from "react";
import Input from "../../shared/Input/Input";

const ShippingForm: FC = () => {
  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = target.value;
    console.log(inputValue);
  }

  return(
    <section>
      <p>Shipping Information</p>
      <div>
        <Input
          firstContainerClassName="search-form"
          onChange={handleChange}
          name="first-name"
          placeholder="Enter your first name"
          label="First name"
        />
      </div>
    </section>
  )
};

export default ShippingForm;