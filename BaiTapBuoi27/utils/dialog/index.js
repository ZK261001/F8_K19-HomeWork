import {
    getCustomerById,
    editCustomerById,
    createCustomer,
    getCustomers,
} from "../../main.js";

import { reloadTable } from "../table/index.js";

function renderDialog() {
    // ---- OVERLAY ----
    const overlay = document.createElement("div");
    overlay.classList = "popup-overlay";

    const backdrop = document.createElement("label");
    backdrop.classList = "popup-backdrop";
    backdrop.setAttribute("for", "popup-toggle");

    // ---- POPUP CONTENT ----
    const popupContent = document.createElement("div");
    popupContent.setAttribute("class", "panel popup-content");

    // ---- PANEL HEADER ----
    const panelHeader = document.createElement("div");
    panelHeader.setAttribute("class", "panel-header");
    panelHeader.setAttribute(
        "style",
        "border-bottom: none; padding-bottom: 0;",
    );

    const panelTitle = document.createElement("h2");
    panelTitle.classList = "panel-title";
    panelTitle.innerText = "Customer Details";

    panelHeader.append(panelTitle);

    // ---- POPUP BODY ----
    const popupBody = document.createElement("div");
    popupBody.classList = "popup-body";

    const formGrid = document.createElement("div");
    formGrid.classList = "form-grid";

    // -- Company Name --
    const nameFormGroup = document.createElement("div");
    nameFormGroup.setAttribute("class", "form-group full-width");

    const nameLabel = document.createElement("label");
    nameLabel.classList = "form-label";
    nameLabel.innerText = "Company Name *";

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "form-input name-input");
    nameInput.setAttribute("placeholder", "e.g. Cty TNHH F8");

    nameFormGroup.append(nameLabel, nameInput);

    // -- Email --
    const emailFormGroup = document.createElement("div");
    emailFormGroup.setAttribute("class", "form-group");

    const emailLabel = document.createElement("label");
    emailLabel.classList = "form-label";
    emailLabel.innerText = "Email Address";

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("class", "form-input email-input");
    emailInput.setAttribute("placeholder", "contact@example.com");

    emailFormGroup.append(emailLabel, emailInput);

    // -- Phone --
    const phoneFormGroup = document.createElement("div");
    phoneFormGroup.setAttribute("class", "form-group");

    const phoneLabel = document.createElement("label");
    phoneLabel.classList = "form-label";
    phoneLabel.innerText = "Phone Number";

    const phoneInput = document.createElement("input");
    phoneInput.setAttribute("type", "tel");
    phoneInput.setAttribute("class", "form-input phone-input");
    phoneInput.setAttribute("placeholder", "0987 654 321");

    phoneFormGroup.append(phoneLabel, phoneInput);

    // -- Tax ID --
    const taxFormGroup = document.createElement("div");
    taxFormGroup.setAttribute("class", "form-group full-width");

    const taxLabel = document.createElement("label");
    taxLabel.classList = "form-label";
    taxLabel.innerText = "Tax ID (Mã số thuế)";

    const taxInput = document.createElement("input");
    taxInput.setAttribute("type", "text");
    taxInput.setAttribute("class", "form-input tax-input");
    taxInput.setAttribute("placeholder", "018381123412");

    taxFormGroup.append(taxLabel, taxInput);

    // -- Address --
    const addressFormGroup = document.createElement("div");
    addressFormGroup.setAttribute("class", "form-group full-width");

    const addressLabel = document.createElement("label");
    addressLabel.classList = "form-label";
    addressLabel.innerText = "Physical Address";

    const addressInput = document.createElement("input");
    addressInput.setAttribute("type", "text");
    addressInput.setAttribute("class", "form-input address-input");
    addressInput.setAttribute("placeholder", "Enter full address...");

    addressFormGroup.append(addressLabel, addressInput);

    // Ghép các field vào formGrid
    formGrid.append(
        nameFormGroup,
        emailFormGroup,
        phoneFormGroup,
        taxFormGroup,
        addressFormGroup,
    );
    popupBody.append(formGrid);

    // popupFooter
    const popupFooter = document.createElement("div");
    popupFooter.className = "popup-footer";

    // Cancel button
    const cancelBtn = document.createElement("label");
    cancelBtn.setAttribute("for", "popup-toggle");
    cancelBtn.className = "btn btn-cancel";
    cancelBtn.innerText = "Cancel";

    cancelBtn.addEventListener("click", () => {
        closeDialog();
    });

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "btn btn-save";
    saveBtn.innerText = "Save Customer";

    popupFooter.append(cancelBtn, saveBtn);

    // ---- GHÉP TẤT CẢ ----
    popupContent.append(panelHeader, popupBody, popupFooter);
    overlay.append(backdrop, popupContent);

    return overlay;
}

const openDialog = async (id = null) => {
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupContent = document.querySelector(".popup-content");
    const nameInput = document.querySelector(".name-input");
    const emailInput = document.querySelector(".email-input");
    const phoneInput = document.querySelector(".phone-input");
    const taxInput = document.querySelector(".tax-input");
    const addressInput = document.querySelector(".address-input");
    const saveBtn = document.querySelector(".btn-save");

    if (id) {
        const customer = await getCustomerById(id);
        nameInput.value = customer.companyName;
        emailInput.value = customer.email;
        phoneInput.value = customer.phone;
        taxInput.value = customer.taxId;
        addressInput.value = customer.address;
    } else {
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        taxInput.value = "";
        addressInput.value = "";
    }

    popupOverlay.classList.add("show");
    popupContent.classList.add("show");

    saveBtn.addEventListener("click", async () => {
        try {
            const data = {
                companyName: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                taxId: taxInput.value,
                address: addressInput.value,
            };

            if (id) {
                await editCustomerById(id, data);
            } else {
                await createCustomer(data);
            }

            closeDialog();
            reloadTable();
        } catch (error) {
            alert("Save data failed");
        }
    });
};

const closeDialog = () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupContent = document.querySelector(".popup-content");
    popupOverlay.classList.remove("show");
    popupContent.classList.remove("show");
};

export { renderDialog, openDialog, closeDialog };
