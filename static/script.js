// ==================================================
// ELEMENTS
// ==================================================

const form = document.getElementById("symptomForm");

const symptomsInput = document.getElementById("symptoms");

const characterCount = document.getElementById("characterCount");

const predictButton = document.getElementById("predictButton");

const buttonText = document.getElementById("buttonText");

const clearButton = document.getElementById("clearButton");

const loadingMessage = document.getElementById("loadingMessage");

const result = document.getElementById("result");

const diseaseName = document.getElementById("diseaseName");

const firstAidList = document.getElementById("firstAidList");

const errorMessage = document.getElementById("errorMessage");

const exampleButtons =
    document.querySelectorAll(".example-button");


// ==================================================
// CHARACTER COUNTER
// ==================================================

function updateCharacterCount() {

    const length = symptomsInput.value.length;

    characterCount.textContent =
        `${length} / 500`;

}

symptomsInput.addEventListener(
    "input",
    updateCharacterCount
);


// ==================================================
// EXAMPLE BUTTONS
// ==================================================

exampleButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        symptomsInput.value =
            button.dataset.example;

        updateCharacterCount();

        symptomsInput.focus();

        hideError();

    });

});


// ==================================================
// CLEAR BUTTON
// ==================================================

clearButton.addEventListener(
    "click",
    function() {

        symptomsInput.value = "";

        updateCharacterCount();

        result.classList.add("hidden");

        hideError();

        symptomsInput.focus();

    }
);


// ==================================================
// FORM SUBMISSION
// ==================================================

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const symptoms =
            symptomsInput.value.trim();


        // ------------------------------------------
        // Validate empty input
        // ------------------------------------------

        if (symptoms === "") {

            showError(
                "Please describe your symptoms before analyzing them."
            );

            symptomsInput.focus();

            return;

        }


        // ------------------------------------------
        // Validate very short input
        // ------------------------------------------

        if (symptoms.length < 5) {

            showError(
                "Please provide a little more detail about your symptoms."
            );

            symptomsInput.focus();

            return;

        }


        // ------------------------------------------
        // Hide previous messages
        // ------------------------------------------

        hideError();

        result.classList.add("hidden");


        // ------------------------------------------
        // Show loading state
        // ------------------------------------------

        predictButton.disabled = true;

        buttonText.textContent =
            "Analyzing...";

        loadingMessage.classList.remove(
            "hidden"
        );


        try {

            // --------------------------------------
            // Send request to Flask
            // --------------------------------------

            const response = await fetch(
                "/predict",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        symptoms: symptoms
                    })
                }
            );


            // --------------------------------------
            // Read server response
            // --------------------------------------

            const data =
                await response.json();


            // --------------------------------------
            // Handle backend errors
            // --------------------------------------

            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to process your request."
                );

            }


            // --------------------------------------
            // Display disease
            // --------------------------------------

            diseaseName.textContent =
                data.disease;


            // --------------------------------------
            // Clear old care information
            // --------------------------------------

            firstAidList.innerHTML = "";


            // --------------------------------------
            // Display care information
            // --------------------------------------

            if (
                Array.isArray(
                    data.firstAidSteps
                )
            ) {

                data.firstAidSteps.forEach(
                    function(step) {

                        const listItem =
                            document.createElement(
                                "li"
                            );

                        listItem.textContent =
                            step;

                        firstAidList.appendChild(
                            listItem
                        );

                    }
                );

            }


            // --------------------------------------
            // Show result
            // --------------------------------------

            result.classList.remove(
                "hidden"
            );


            // --------------------------------------
            // Scroll to result
            // --------------------------------------

            setTimeout(function() {

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);


        } catch (error) {

            console.error(
                "Prediction error:",
                error
            );

            showError(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            // --------------------------------------
            // Restore button
            // --------------------------------------

            predictButton.disabled = false;

            buttonText.textContent =
                "Analyze Symptoms";

            loadingMessage.classList.add(
                "hidden"
            );

        }

    }
);


// ==================================================
// ERROR FUNCTIONS
// ==================================================

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.remove(
        "hidden"
    );

}

function hideError() {

    errorMessage.textContent = "";

    errorMessage.classList.add(
        "hidden"
    );

}


// ==================================================
// INITIAL STATE
// ==================================================

updateCharacterCount();