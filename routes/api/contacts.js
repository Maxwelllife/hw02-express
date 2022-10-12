const express = require("express");

const { validationBody, isValidId } = require("../../middlewares");
const { joiContactsSchemas } = require("../../models");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validationBody(joiContactsSchemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  isValidId,
  validationBody(joiContactsSchemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(joiContactsSchemas.updateSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
