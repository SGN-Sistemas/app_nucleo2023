export const validatePassword = (password) => {
  const errors = [];
  // Mínimo de 8 caracteres
  const regexLength = /^.{8,}$/;

  // Pelo menos uma letra maiúscula
  const regexUppercase = /^(?=.*[A-Z]).+$/;

  // Pelo menos uma letra minúscula
  const regexLowercase = /^(?=.*[a-z]).+$/;

  // Pelo menos um número
  const regexNumber = /^(?=.*[0-9]).+$/;

  // Pelo menos um caractere especial
  const regexSpecialChar = /^(?=.*[!@#$%^&*]).+$/;

  // Não deve conter espaços em branco
  const regexNoWhitespace = /^\S+$/;

  // Pelo menos 3 das categorias anteriores em qualquer ordem
  const regexComplexity = /^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*]){1,}).{8,}$/;


  if (!regexLength.test(password)) {
    errors.push("A senha deve ter no mínimo 8 caracteres.\n");
  }

  if (!regexUppercase.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula.\n");
  }

  if (!regexLowercase.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula.\n");
  }

  if (!regexNumber.test(password)) {
    errors.push("A senha deve conter pelo menos um número.\n");
  }

  if (!regexSpecialChar.test(password)) {
    errors.push("A senha deve conter pelo menos um caractere especial (!@#$%^&*).\n");
  }

  if (!regexNoWhitespace.test(password)) {
    errors.push("A senha não pode conter espaços em branco.\n");
  }

  if (errors.length === 0) {
    return false;
  } else {
    return errors;
  }
}



