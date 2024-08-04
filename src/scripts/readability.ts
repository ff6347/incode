document.addEventListener('DOMContentLoaded', () => {
  // get all the checkboxes and uncheck them
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (
      checkbox instanceof HTMLInputElement &&
      Object.hasOwn(checkbox, 'checked')
    ) {
      checkbox.checked = false;
    }
  });
  // Select all checkboxes
  const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    'input[type="checkbox"]',
  );
  const inputFontFamily = document.getElementById('font-family');
  const inputFontSize = document.getElementById('font-size');
  const lineLength = document.getElementById('line-length');
  const lineHeight = document.getElementById('line-height');
  const margin = document.getElementById('margin');
  const padding = document.getElementById('padding');
  const smallTweaks = document.getElementById('small-tweaks');

  if (!(inputFontFamily instanceof HTMLInputElement)) {
    throw new Error('input#font-family not found');
  }
  if (!(inputFontSize instanceof HTMLInputElement)) {
    throw new Error('input#font-size not found');
  }
  if (!(lineLength instanceof HTMLInputElement)) {
    throw new Error('input#line-length not found');
  }
  if (!(lineHeight instanceof HTMLInputElement)) {
    throw new Error('input#line-height not found');
  }
  if (!(margin instanceof HTMLInputElement)) {
    throw new Error('input#margin not found');
  }
  if (!(padding instanceof HTMLInputElement)) {
    throw new Error('input#padding not found');
  }
  if (!(smallTweaks instanceof HTMLInputElement)) {
    throw new Error('input#small-tweaks not found');
  }

  inputFontFamily.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }
    fontFamilyHandler(event.target.checked);
  });

  inputFontSize.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    fontSizeHandler(event.target.checked);
  });

  lineLength.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    lineLengthHandler(event.target.checked);
  });

  lineHeight.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    lineHeightHandler(event.target.checked);
  });

  margin.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    marginHandler(event.target.checked);
  });

  padding.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    paddingHandler(event.target.checked);
  });

  smallTweaks.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.checked) {
      throw new Error('event.target not an instance of HTMLInputElement');
    }

    smallTweaksHandler(event.target.checked);
  });

  // get the urlsearchparams checked value. If it is true, check the checkbox
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.has('checked')) {
    const checked = urlSearchParams.get('checked');
    if (checked === 'true') {
      const fullCodeElement = document.getElementById('full-code');
      if (fullCodeElement === null) {
        throw new Error('#full-code not found');
      }

      fullCodeElement.classList.remove('hidden');
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          if (!(checkbox instanceof HTMLInputElement)) {
            throw new Error('checkbox not an instance of HTMLInputElement');
          }
          checkbox.checked = true;
          smallTweaksHandler(true);
          paddingHandler(true);
          marginHandler(true);
          lineHeightHandler(true);
          lineLengthHandler(true);
          fontSizeHandler(true);
          fontFamilyHandler(true);
        });
    }
  }

  // Function to check if all checkboxes are checked
  function checkCheckboxes() {
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked,
    );
    const fullCodeElement = document.getElementById('full-code');
    if (fullCodeElement === null) {
      throw new Error('#full-code not found');
    }

    // Toggle the .hidden class based on whether all checkboxes are checked
    if (allChecked) {
      fullCodeElement.classList.remove('hidden');
    } else {
      fullCodeElement.classList.add('hidden');
    }
  }

  // Add change event listener to each checkbox
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', checkCheckboxes);
  });
});
function fontFamilyHandler(checked: boolean) {
  const fontFamiliesCodeElement = document.getElementById('font-family-code');
  if (fontFamiliesCodeElement === null) {
    throw new Error('#font-family-code not found');
  }
  if (checked) {
    fontFamiliesCodeElement.classList.remove('hidden');

    document.querySelectorAll('code').forEach((element) => {
      element.classList.add('monospace');
    });
    document.body.classList.add('font-family');
  } else {
    fontFamiliesCodeElement.classList.add('hidden');

    document.querySelectorAll('code').forEach((element) => {
      element.classList.remove('monospace');
    });
    document.body.classList.remove('font-family');
  }
}

function fontSizeHandler(checked: boolean) {
  const fontSizeCodeElement = document.getElementById('font-size-code');
  if (fontSizeCodeElement === null) {
    throw new Error('#font-size-code not found');
  }

  if (checked) {
    document.documentElement.setAttribute('class', 'text-size');
    fontSizeCodeElement.classList.remove('hidden');
  } else {
    document.documentElement.removeAttribute('class');
    fontSizeCodeElement.classList.add('hidden');
  }
}

function lineLengthHandler(checked: boolean) {
  const lineLengthCodeElement = document.getElementById('line-length-code');
  if (lineLengthCodeElement === null) {
    throw new Error('#line-length-code not found');
  }

  if (checked) {
    document.body.classList.add('line-length');
    lineLengthCodeElement.classList.remove('hidden');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.add('line-length');
      element.classList.add('pre');
    });
  } else {
    document.body.classList.remove('line-length');
    lineLengthCodeElement.classList.add('hidden');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.remove('line-length');
      element.classList.remove('pre');
    });
  }
}

function lineHeightHandler(checked: boolean) {
  const lineHeightCodeElement = document.getElementById('line-height-code');
  if (lineHeightCodeElement === null) {
    throw new Error('#line-height-code not found');
  }

  if (checked) {
    document.body.classList.add('line-height');
    lineHeightCodeElement.classList.remove('hidden');
  } else {
    document.body.classList.remove('line-height');
    lineHeightCodeElement.classList.add('hidden');
  }
}

function marginHandler(checked: boolean) {
  const marginCodeElement = document.getElementById('margin-code');
  if (marginCodeElement === null) {
    throw new Error('#margin-code not found');
  }

  if (checked) {
    marginCodeElement.classList.remove('hidden');
    document.body.classList.add('margin');
  } else {
    marginCodeElement.classList.add('hidden');

    document.body.classList.remove('margin');
  }
}

function paddingHandler(checked: boolean) {
  const paddingCodeElement = document.getElementById('padding-code');
  if (paddingCodeElement === null) {
    throw new Error('#padding-code not found');
  }

  if (checked) {
    document.body.classList.add('padding');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.add('padding-pre');
    });
    paddingCodeElement.classList.remove('hidden');
    document.querySelectorAll('input,body').forEach((element) => {
      element.classList.add('padding');
    });
  } else {
    document.body.classList.remove('padding');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.remove('padding-pre');
    });

    paddingCodeElement.classList.add('hidden');
    document.querySelectorAll('input,body').forEach((element) => {
      element.classList.remove('padding');
    });
  }
}

function smallTweaksHandler(checked: boolean) {
  const smallTweaksCodeElement = document.getElementById('small-tweaks-code');
  if (smallTweaksCodeElement === null) {
    throw new Error('#small-tweaks-code not found');
  }

  if (checked) {
    document.body.classList.add('colors');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.add('colors-pre');
    });
    document.querySelectorAll('hr').forEach((element) => {
      element.classList.add('hr');
    });
    smallTweaksCodeElement.classList.remove('hidden');
  } else {
    document.querySelectorAll('hr').forEach((element) => {
      element.classList.remove('hr');
    });
    document.body.classList.remove('colors');
    document.querySelectorAll('pre').forEach((element) => {
      element.classList.remove('colors-pre');
    });
    smallTweaksCodeElement.classList.add('hidden');
  }
}
