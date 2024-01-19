export const validatePassword = (passToCheck) => {
  let errors = {
    lower: false,
    upper: false,
    number: false,
    length: false,
    isValid: false,
  };

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (passToCheck.match(lowerCaseLetters)) {
    errors.lower = true;
  } else {
    errors.lower = false;
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (passToCheck.match(upperCaseLetters)) {
    errors.upper = true;
  } else {
    errors.upper = false;
  }

  // Validate numbers
  var numbers = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
  if (passToCheck.match(numbers)) {
    errors.number = true;
  } else {
    errors.number = false;
  }

  // Validate length
  if (passToCheck.length >= 8) {
    errors.length = true;
  } else {
    errors.length = false;
  }

  if (errors.lower && errors.upper && errors.number && errors.length) {
    errors.isValid = true;
  }

  return errors;
};

export const matchPassword = (password, confirmPassword) => {
  let isValid = false;
  if (password !== "" && confirmPassword !== "") {
    if (password === confirmPassword) {
      isValid = true;
    }
  }
  return isValid;
};

export const errorResponse = (errors) => {
  let numOfErrors = 0;
  let base = "Please correct the following errors: ";
  if (!errors.name) {
    base = base.concat("name");
    numOfErrors++;
  }
  if (!errors.email) {
    if (numOfErrors > 0) {
      base = base.concat(", ");
    }
    base = base.concat("email address");
    numOfErrors++;
  }
  if (!errors.validate) {
    if (numOfErrors > 0) {
      base = base.concat(", ");
    }
    base = base.concat(
      "password must be at least 8 characters and contain at least 1 lowercase letter, uppercase letter, special character"
    );
    numOfErrors++;
  }
  if (!errors.match) {
    if (numOfErrors > 0) {
      base = base.concat(", ");
    }
    base = base.concat("passwords do not match");
    numOfErrors++;
  }
  return base;
};
