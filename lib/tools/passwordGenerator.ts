export interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeSimilarCharacters: boolean; // e.g. i, l, 1, L, o, 0, O
}

export function generatePassword(options: PasswordOptions): string {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similarChars = /[il1Lo0O]/g;

    let charset = "";
    if (options.includeLowercase) charset += lowercase;
    if (options.includeUppercase) charset += uppercase;
    if (options.includeNumbers) charset += numbers;
    if (options.includeSymbols) charset += symbols;

    if (charset === "") return "";

    if (options.excludeSimilarCharacters) {
        charset = charset.replace(similarChars, "");
    }

    let password = "";
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

export function calculatePasswordStrength(password: string): {
    score: number;
    label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
} {
    let score = 0;
    if (!password) return { score: 0, label: "Very Weak" };

    // Length
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (password.length > 16) score += 1;

    // Diversity
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score < 3) return { score, label: "Very Weak" };
    if (score < 4) return { score, label: "Weak" };
    if (score < 5) return { score, label: "Fair" };
    if (score < 7) return { score, label: "Strong" };
    return { score, label: "Very Strong" };
}
