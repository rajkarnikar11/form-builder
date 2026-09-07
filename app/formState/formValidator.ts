import { Field } from "../context/FormStructureContext"
import { getAllValues } from "./formValues";
export const validateAll = (fields: Field[]): boolean => {
    console.log(fields, 'fields', getAllValues())
    let allValid = true;

    return allValid
}