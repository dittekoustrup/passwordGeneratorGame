const passwordInput = document.getElementById('passwordInput');
const currentPrompt = document.getElementById('currentPrompt');
const completedPrompts = document.getElementById('completedPrompts');

const rules = [
    { message: 'Rule 1: Your password must be at least 5 characters long.', check: (pwd) => pwd.length >= 5 },
    { message: 'Rule 2: Your password must contain at least one number.', check: (pwd) => /\d/.test(pwd) },
    { message: 'Rule 3: Your password must contain at least one uppercase letter.', check: (pwd) => /[A-Z]/.test(pwd) },
    { message: 'Rule 4: Your password must contain at least one special character (!@#$%^&*).', check: (pwd) => /[!@#$%^&*]/.test(pwd) }
];

passwordInput.addEventListener('input', checkPassword);

let completedRules = [];

function checkPassword() {
    const password = passwordInput.value;

    // Hide the current prompt if the password is empty
    if (password.length === 0) {
        currentPrompt.classList.add('hidden');
        return;
    }

    // Show the current prompt
    currentPrompt.classList.remove('hidden');

    let allRulesMet = true;

    for (let i = 0; i < rules.length; i++) {

        if (completedRules.length === i && allRulesMet) {
            completedRules.push(rules[i]);
        }

        if (rules[i].check(password) == false) {
            allRulesMet = false;
        }
    }
    let sorted = sortPrompts();
    completedPrompts.innerHTML = '';
    sorted.forEach(prompt => {
        if (prompt.check(password)) {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'prompt completed';
            ruleElement.innerText = prompt.message;
            completedPrompts.appendChild(ruleElement);
        } else {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'prompt uncompleted';
            ruleElement.innerText = prompt.message;
            completedPrompts.appendChild(ruleElement);
        }
    })


    if (allRulesMet) {
        currentPrompt.innerText = 'Your password meets all the requirements!';
    } else {
        currentPrompt.innerText = '';
    }
}

function sortPrompts() {
    let sortedPrompts = [];
    const password = passwordInput.value;

    completedRules.forEach(prompt => {
        if (sortedPrompts.length == 0) {
            sortedPrompts.push(prompt);
        } else {
            if (prompt.check(password) == false) {
                sortedPrompts.splice(0, 0, prompt);
            } else {
                let isInserted = false; 
                for (let i = 0; i < sortedPrompts.length; i++) {
                    const element = sortedPrompts[i];
                    if (element.check(password) == true) {
                        sortedPrompts.splice(i, 0, prompt);
                        isInserted = true;
                        break;
                    }
                }
                if (isInserted == false) {
                    sortedPrompts.push(prompt);
                }
            }
        }
        
    });
    return sortedPrompts;
}

