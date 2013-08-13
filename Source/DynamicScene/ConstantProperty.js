/*global define*/
define([
        '../Core/defaultValue',
        '../Core/DeveloperError',
        '../Core/Enumeration'
    ], function(
        defaultValue,
        DeveloperError,
        Enumeration) {
    "use strict";

    function prototypeClone(value, result) {
        return value.clone(result);
    }

    function noClone(value, result) {
        return value;
    }

    /**
     * A {@link Property} whose value never changes.
     *
     * @alias ConstantProperty
     * @constructor
     *
     * @param {Object|Number|String} value The property value.
     * @param {Function} [clone=value.clone] A function which takes the value and result parameter and clones it.
     * This parameter is only required if the value is not a number or string and does not have a clone function.
     *
     * @exception {DeveloperError} value is required.
     * @exception {DeveloperError} clone is a required function.
     */
    var ConstantProperty = function(value, clone) {
        if (typeof value === 'undefined') {
            throw new DeveloperError('value is required.');
        }

        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && !(value instanceof Enumeration) && !Array.isArray(value)) {
            if (typeof value.clone !== 'function' && typeof clone !== 'function') {
                throw new DeveloperError('clone is a required function.');
            }

            clone = defaultValue(clone, prototypeClone);
        }

        this._value = value;
        this._clone = defaultValue(clone, noClone);
    };

    /**
     * @memberof ConstantProperty
     * @returns {Boolean} Always returns false, since this property never varies with simulation time.
     */
    ConstantProperty.prototype.getIsTimeVarying = function() {
        return false;
    };

    /**
     * Returns the value of the property at the specified simulation time.
     * @memberof ConstantProperty
     *
     * @param {JulianDate} time The simulation time for which to retrieve the value.
     * @param {Object} [result] The object to store the value into, if omitted, a new instance is created and returned.
     * @returns {Object} The modified result parameter or a new instance if the result parameter was not supplied.
     */
    ConstantProperty.prototype.getValue = function(time, result) {
        return this._clone(this._value, result);
    };

    return ConstantProperty;
});
