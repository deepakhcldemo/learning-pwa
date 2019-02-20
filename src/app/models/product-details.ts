/**
 * Processs object
 */
export class ProductDetails {
    /**
     * Products  of processs object
     */
    public products: Object = {};
    /**
     * Hierarchies  of processs object
     */
    public hierarchies: Array<Object> = [];
    /**
     * Assessments  of processs object
     */
    public assessments: Set<String> = new Set<String>();
    /**
     * Program assessment mapping of processs object
     */
    public programAssessmentMapping: Array<Object> = [];
}
