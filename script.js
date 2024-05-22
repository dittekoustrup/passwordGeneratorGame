const passwordInput = document.getElementById('passwordInput');
const currentPrompt = document.getElementById('currentPrompt');
const completedPrompts = document.getElementById('completedPrompts');
const passwordCounter = document.getElementById('passwordCounter');

// Password prompt rules
const rules = [
    { message: 'Rule 1: Your password must be at least 5 characters long.', check: (pwd) => pwd.length >= 5 },
    { message: 'Rule 2: Your password must contain at least one number.', check: (pwd) => /\d/.test(pwd) },
    { message: 'Rule 3: Your password must contain at least one uppercase letter.', check: (pwd) => /[A-Z]/.test(pwd) },
    { message: 'Rule 4: Your password must contain at least one special character.', check: (pwd) => /[!@#$%^&*]/.test(pwd) },
    { message: 'Rule 5: Your password must be at least 10 characters long.', check: (pwd) => pwd.length >= 10 },
    { message: 'Rule 6: Your password must contain at least one Roman numeral', check: (pwd) => /[IVXLCDM]/.test(pwd) },
    { message: 'Rule 7: This is Slinky 🦎 and he loves to be warm, please take him with you to keep him warm', check: (pwd) => /[🦎]/.test(pwd) },
    { message: 'Rule 8: Your password must contain a prime number.', check: (pwd) => /[2357]/.test(pwd) },
    { message: 'Rule 9: Your password must contain the word "unicorn" 🦄.', check: (pwd) => /unicorn/.test(pwd) },
    { message: 'Rule 10: Your password must contain the name of a prime color.', check: (pwd) => /(?:\w|^)(red|blue|green)(?:\w|$)/i.test(pwd) }
];

passwordInput.addEventListener('input', checkPassword);

let completedRules = [];

function checkPassword() {
    const password = passwordInput.value;

    // Hide the current prompt and password counter if the password is empty
    if (password.length === 0) {
        currentPrompt.classList.add('hidden');
        passwordCounter.innerText = '';
        return;
    }

    // Show the current prompt and password counter
    currentPrompt.classList.remove('hidden');
    passwordCounter.innerText = password.length;

    let allRulesMet = true;

    // Check each rule to see if the password meets the criteria
    for (let i = 0; i < rules.length; i++) {
        // If the number of completed rules matches the current index and all previous rules are met, add the current rule to completedRules
        if (completedRules.length === i && allRulesMet) {
            completedRules.push(rules[i]);
        }
        // If the current rule is not met, set allRulesMet to false
        if (rules[i].check(password) == false) {
            allRulesMet = false;
        }
    }
    // Call sortPrompts() function. 
    let sorted = sortPrompts();
    // Clears the completedPrompts element's content.
    completedPrompts.innerHTML = '';
    
    // Iterate through the sorted prompts to display them
    sorted.forEach(prompt => {
        if (prompt.check(password)) {
            // Create a new div element for the prompt
            const ruleElement = document.createElement('div');
            // If the prompt's rule is met, mark it as completed; otherwise, mark it as uncompleted
            ruleElement.className = 'prompt completed';
            ruleElement.innerText = prompt.message;
            // Append the new div element to the completedPrompts container
            completedPrompts.appendChild(ruleElement);
        } else {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'prompt uncompleted';
            ruleElement.innerText = prompt.message;
            completedPrompts.appendChild(ruleElement);
        }
    })

    // Update the current prompt message based on whether all rules are met
    if (allRulesMet) {
        currentPrompt.innerText = 'Your password meets all the requirements!';
    } else {
        currentPrompt.innerText = '';
    }
}

// Function for sorting the prompts - Decending order and based on prompt completed
function sortPrompts() {
    let sortedPrompts = [];
    let numUncompleted = 0;
    const password = passwordInput.value;

    completedRules.forEach(prompt => {
        // Checks if the prompt is "completed" based on the password.
        if (prompt.check(password)) {
            // Inserts the completed prompt at numUncompleted, which ensures it is placed after all uncompleted prompts processed so far.
            sortedPrompts.splice(numUncompleted, 0, prompt);
        } else {
            // Inserts the uncompleted prompt at the beginning of the sortedPrompts array.
            sortedPrompts.splice(0, 0, prompt);
            // Increments the counter for uncompleted prompts to ensure future completed prompts are inserted after all current uncompleted ones.
            numUncompleted += 1;
        }
    })
    return sortedPrompts;
}



// First try, more complicated - Tried to understand sorting
// function sortPrompts() {
//     let sortedPrompts = [];
//     const password = passwordInput.value;

//     completedRules.forEach(prompt => {
//         if (sortedPrompts.length == 0) {
//             sortedPrompts.push(prompt);
//         } else {
//             if (prompt.check(password) == false) {
//                 sortedPrompts.splice(0, 0, prompt);
//             } else {
//                 let isInserted = false; 
//                 for (let i = 0; i < sortedPrompts.length; i++) {
//                     const element = sortedPrompts[i];
//                     if (element.check(password) == true) {
//                         sortedPrompts.splice(i, 0, prompt);
//                         isInserted = true;
//                         break;
//                     }
//                 }
//                 if (isInserted == false) {
//                     sortedPrompts.push(prompt);
//                 }
//             }
//         }
        
//     });
//     return sortedPrompts;
// }

