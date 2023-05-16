$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    // Check if all required fields are filled
    var isValid = true;
    var errorFields = [];

    current_fs.find("input[required]").each(function () {
      if ($(this).val() === "") {
        isValid = false;
        errorFields.push($(this));
      }
    });

    if (!isValid) {
      // Display an error message and highlight fields
      var errorMessage = "Please fill in all required fields.";
      displayErrorMessage(errorMessage);
      highlightErrorFields(errorFields);
      return;
    }

    // Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    // Show the next fieldset
    next_fs.show();
    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // For making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative"
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 500
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    // Remove class active
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    // Show the previous fieldset
    previous_fs.show();

    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // For making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative"
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat((100 / steps) * curStep);
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  function displayErrorMessage(message) {
    var errorDiv = $("#error-message");
    errorDiv.text(message);
    errorDiv.addClass("error-message");
  }

  function highlightErrorFields(fields) {
    $(".error-field").removeClass("error-field");

    fields.forEach(function (field) {
      field.addClass("error-field");
    });

    var form = $(".shakeB");
    form.addClass("shake");

    setTimeout(function () {
      form.removeClass("shake");
    }, 500);
  }
});
