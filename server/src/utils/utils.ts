export function isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

export function getDaysSearchOrder(dayToSearch: number): string[] {
    switch (dayToSearch) {
        case 0: return ['sunday', 'week', 'saturday'];
        case 6: return ['saturday', 'sunday', 'week'];
        default: return ['week', 'saturday', 'sunday'];
    }
}