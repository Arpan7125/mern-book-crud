const rupees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

export const formatPrice = (value) => rupees.format(Number(value) || 0);
