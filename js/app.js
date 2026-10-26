"use strict";

function isValidStudentNumber(value) {
  if (typeof value !== "string") {
    return false;
  }
  return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
  if (typeof value !== "string") {
    return false;
  }
  if (value.length < 8) {
    return false;
  }
  if (/\s/.test(value)) {
    return false;
  }
  if (!/[A-Z]/.test(value)) {
    return false;
  }
  if (!/\d/.test(value)) {
    return false;
  }
  if (!/[@$!]/.test(value)) {
    return false;
  }
  return true;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidMobileNumber(value) {
  return /^(09\d{9}|\+639\d{9})$/.test(value);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber: isValidStudentNumber,
    isValidPassword: isValidPassword
  };
}

if (typeof document !== "undefined") {
  function initRegistrationForm() {
    var form = document.getElementById("registrationForm");
    var fullNameInput = document.getElementById("fullName");
    var studentNumberInput = document.getElementById("studentNumber");
    var emailInput = document.getElementById("email");
    var mobileNumberInput = document.getElementById("mobileNumber");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var courseSelect = document.getElementById("course");
    var termsInput = document.getElementById("terms");

    var fullNameError = document.getElementById("fullNameError");
    var studentNumberError = document.getElementById("studentNumberError");
    var emailError = document.getElementById("emailError");
    var mobileNumberError = document.getElementById("mobileNumberError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var courseError = document.getElementById("courseError");
    var termsError = document.getElementById("termsError");
    var passwordFeedback = document.getElementById("passwordFeedback");
    var successMessage = document.getElementById("successMessage");
    var registrationSummary = document.getElementById("registrationSummary");
    var summaryName = document.getElementById("summaryName");
    var summaryStudentNumber = document.getElementById("summaryStudentNumber");
    var summaryEmail = document.getElementById("summaryEmail");
    var summaryMobileNumber = document.getElementById("summaryMobileNumber");
    var summaryCourse = document.getElementById("summaryCourse");

    function setFieldState(inputEl, errorEl, message) {
      errorEl.textContent = message;
      if (message) {
        inputEl.setAttribute("aria-invalid", "true");
        return false;
      }
      inputEl.setAttribute("aria-invalid", "false");
      return true;
    }

    function validateFullName() {
      var value = fullNameInput.value.trim();
      if (!value) {
        return setFieldState(fullNameInput, fullNameError, "Full name is required.");
      }
      if (value.length < 2) {
        return setFieldState(
          fullNameInput,
          fullNameError,
          "Enter a full name with at least two characters."
        );
      }
      return setFieldState(fullNameInput, fullNameError, "");
    }

    function validateStudentNumber() {
      var value = studentNumberInput.value.trim();
      if (!value) {
        return setFieldState(studentNumberInput, studentNumberError, "Student number is required.");
      }
      if (!isValidStudentNumber(value)) {
        return setFieldState(
          studentNumberInput,
          studentNumberError,
          "Enter a student number in the format 24-1234-123."
        );
      }
      return setFieldState(studentNumberInput, studentNumberError, "");
    }

    function validateEmail() {
      var value = emailInput.value.trim();
      if (!value) {
        return setFieldState(emailInput, emailError, "Email address is required.");
      }
      if (!isValidEmail(value)) {
        return setFieldState(
          emailInput,
          emailError,
          "Enter a valid email with text before @, a domain containing a dot, and no spaces."
        );
      }
      return setFieldState(emailInput, emailError, "");
    }

    function validateMobileNumber() {
      var value = mobileNumberInput.value.trim();
      if (!value) {
        return setFieldState(mobileNumberInput, mobileNumberError, "Mobile number is required.");
      }
      if (!isValidMobileNumber(value)) {
        return setFieldState(
          mobileNumberInput,
          mobileNumberError,
          "Enter a mobile number as 09XXXXXXXXX or +639XXXXXXXXX."
        );
      }
      return setFieldState(mobileNumberInput, mobileNumberError, "");
    }

    function validatePassword() {
      var value = passwordInput.value;
      if (!value) {
        return setFieldState(passwordInput, passwordError, "Password is required.");
      }
      if (!isValidPassword(value)) {
        return setFieldState(
          passwordInput,
          passwordError,
          "Password must be at least 8 characters, with one uppercase letter, one digit, one of @, $ or !, and no spaces."
        );
      }
      return setFieldState(passwordInput, passwordError, "");
    }

    function validateConfirmPassword() {
      var value = confirmPasswordInput.value;
      if (!value) {
        return setFieldState(
          confirmPasswordInput,
          confirmPasswordError,
          "Confirm password is required."
        );
      }
      if (value !== passwordInput.value) {
        return setFieldState(
          confirmPasswordInput,
          confirmPasswordError,
          "Passwords do not match."
        );
      }
      return setFieldState(confirmPasswordInput, confirmPasswordError, "");
    }

    function validateCourse() {
      var value = courseSelect.value;
      if (value !== "BSIT" && value !== "BSCS") {
        return setFieldState(courseSelect, courseError, "Select BSIT or BSCS.");
      }
      return setFieldState(courseSelect, courseError, "");
    }

    function validateTerms() {
      if (!termsInput.checked) {
        return setFieldState(
          termsInput,
          termsError,
          "You must agree to the terms and conditions."
        );
      }
      return setFieldState(termsInput, termsError, "");
    }

    function updatePasswordFeedback() {
      var value = passwordInput.value;
      if (!value) {
        passwordFeedback.textContent = "";
        return;
      }

      var needs = [];
      if (value.length < 8) {
        needs.push("at least 8 characters");
      }
      if (!/[A-Z]/.test(value)) {
        needs.push("one uppercase letter");
      }
      if (!/\d/.test(value)) {
        needs.push("one digit");
      }
      if (!/[@$!]/.test(value)) {
        needs.push("one of @, $, or !");
      }
      if (/\s/.test(value)) {
        needs.push("no whitespace");
      }

      if (needs.length === 0) {
        passwordFeedback.textContent = "Password meets all requirements.";
      } else {
        passwordFeedback.textContent = "Password needs: " + needs.join(", ") + ".";
      }
    }

    function validateAllFields() {
      var fullNameValid = validateFullName();
      var studentNumberValid = validateStudentNumber();
      var emailValid = validateEmail();
      var mobileValid = validateMobileNumber();
      var passwordValid = validatePassword();
      var confirmValid = validateConfirmPassword();
      var courseValid = validateCourse();
      var termsValid = validateTerms();

      return (
        fullNameValid &&
        studentNumberValid &&
        emailValid &&
        mobileValid &&
        passwordValid &&
        confirmValid &&
        courseValid &&
        termsValid
      );
    }

    function hideSummary() {
      successMessage.textContent = "";
      successMessage.hidden = true;
      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
      registrationSummary.hidden = true;
    }

    function showSummary() {
      summaryName.textContent = fullNameInput.value.trim();
      summaryStudentNumber.textContent = studentNumberInput.value.trim();
      summaryEmail.textContent = emailInput.value.trim();
      summaryMobileNumber.textContent = mobileNumberInput.value.trim();
      summaryCourse.textContent = courseSelect.value;

      successMessage.textContent = "Registration details validated successfully!";
      successMessage.hidden = false;
      registrationSummary.hidden = false;
    }

    function clearAllFeedback() {
      setFieldState(fullNameInput, fullNameError, "");
      setFieldState(studentNumberInput, studentNumberError, "");
      setFieldState(emailInput, emailError, "");
      setFieldState(mobileNumberInput, mobileNumberError, "");
      setFieldState(passwordInput, passwordError, "");
      setFieldState(confirmPasswordInput, confirmPasswordError, "");
      setFieldState(courseSelect, courseError, "");
      setFieldState(termsInput, termsError, "");
      fullNameInput.removeAttribute("aria-invalid");
      studentNumberInput.removeAttribute("aria-invalid");
      emailInput.removeAttribute("aria-invalid");
      mobileNumberInput.removeAttribute("aria-invalid");
      passwordInput.removeAttribute("aria-invalid");
      confirmPasswordInput.removeAttribute("aria-invalid");
      courseSelect.removeAttribute("aria-invalid");
      termsInput.removeAttribute("aria-invalid");
      passwordFeedback.textContent = "";
      hideSummary();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      hideSummary();

      if (validateAllFields()) {
        showSummary();
      }
    });

    passwordInput.addEventListener("input", function () {
      updatePasswordFeedback();
      validatePassword();
      if (confirmPasswordInput.value) {
        validateConfirmPassword();
      }
    });

    fullNameInput.addEventListener("blur", validateFullName);
    fullNameInput.addEventListener("input", validateFullName);
    studentNumberInput.addEventListener("input", validateStudentNumber);
    emailInput.addEventListener("input", validateEmail);
    mobileNumberInput.addEventListener("input", validateMobileNumber);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    courseSelect.addEventListener("change", validateCourse);
    termsInput.addEventListener("change", validateTerms);

    form.addEventListener("reset", function () {
      setTimeout(clearAllFeedback, 0);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRegistrationForm);
  } else {
    initRegistrationForm();
  }
}