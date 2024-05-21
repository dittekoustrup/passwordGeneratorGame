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
        if (rules[i].check(password)) {
            if (completedRules.length === i && allRulesMet) {
                const ruleElement = document.createElement('div');
                ruleElement.className = 'prompt completed';
                ruleElement.innerText = rules[i].message;
                completedPrompts.appendChild(ruleElement);
                completedRules.push(rules[i].message);
            } else {
                const existingElement = completedPrompts.children[i];
                existingElement.className = 'prompt completed';
            }
        } else {
            if (completedRules.length === i && allRulesMet) {
                const ruleElement = document.createElement('div');
                ruleElement.className = 'prompt uncompleted';
                ruleElement.innerText = rules[i].message;
                completedPrompts.appendChild(ruleElement);
                completedRules.push(rules[i].message);
            } else {
                const existingElement = completedPrompts.children[i];
                existingElement.className = 'prompt uncompleted';
            }
            allRulesMet = false;
        }
    }

    if (allRulesMet) {
        currentPrompt.innerText = 'Your password meets all the requirements!';
    }
}
