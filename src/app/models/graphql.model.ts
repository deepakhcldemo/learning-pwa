// Product data shape
export interface Product {
    productId: number;
    productDisplayName: string;
    program: Program[];
}
// Program data shape
export interface Program {
    programId: number;
    programName: string;
    variant: Variant;
    navigation: string;
}
// Variant data shape
export interface Variant {
    variantName: string;
}
// Product data shape hold all product data in array
export interface ProductData {
    product: Product[];
}
