"use strict";

/**
 * Provides helper functions to traverse the DOM.
 * 
 * @author	Alexander Ebert
 * @copyright	2001-2015 WoltLab GmbH
 * @license	GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
 * @module	WoltLab/WCF/DOM/Traverse
 */
define(['DOM/Util'], function(DOMUtil) {
	/** @const */ var NONE = 0;
	/** @const */ var SELECTOR = 1;
	/** @const */ var CLASS_NAME = 2;
	/** @const */ var TAG_NAME = 3;
	
	var _probe = [
		function(el, none) { return true; },
		function(el, selector) { return DOMUtil.matches(el, selector); },
		function(el, className) { return el.classList.contains(className); },
		function(el, tagName) { return el.nodeName === tagName; }
	];
	
	var _parent = function(el, type, value) {
		el = el.parentNode;
		
		while (el instanceof Element) {
			if (_probe[type](el, value)) {
				return el;
			}
			
			el = el.parentNode;
		}
		
		return null;
	};
	
	var _sibling = function(el, siblingType, type, value) {
		if (el instanceof Element) {
			if (el[siblingType] !== null && _probe[type](el[siblingType], value)) {
				return el[siblingType];
			}
		}
		
		return null;
	};
	
	/**
	 * @constructor
	 */
	function DOMTraverse() {};
	DOMTraverse.prototype = {
		/**
		 * Examines parent nodes and returns the first parent that matches the given selector.
		 * 
		 * @param	{Element}	el		child element
		 * @param	{string}	selector	CSS selector to match parent nodes against
		 * @return	{(Element|null)}	null if no parent node matched the selector
		 */
		parentBySel: function(el, selector) {
			return _parent(el, SELECTOR, selector);
		},
		
		/**
		 * Examines parent nodes and returns the first parent that has the given CSS class set.
		 * 
		 * @param	{Element}	el		child element
		 * @param	{string}	className	CSS class name
		 * @return	{(Element|null)}	null if there is no parent node with given class
		 */
		parentByClass: function(el, className) {
			return _parent(el, CLASS_NAME, className);
		},
		
		/**
		 * Examines parent nodes and returns the first parent which equals the given tag.
		 * 
		 * @param	{Element}	el		child element
		 * @param	{string}	tagName		element tag name
		 * @return	{(Element|null)}	null if there is no parent node of given tag type
		 */
		parentByTag: function(el, tagName) {
			return _parent(el, TAG_NAME, tagName);
		},
		
		/**
		 * Returns the next element sibling.
		 * 
		 * @param	{Element}	el		element
		 * @return	{(Element|null)}	null if there is no next sibling element
		 */
		next: function(el) {
			return _sibling(el, 'nextElementSibling', NONE, null);
		},
		
		/**
		 * Returns the next element sibling that matches the given selector.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	selector	CSS selector to match parent nodes against
		 * @return	{(Element|null)}	null if there is no next sibling element or it does not match the selector
		 */
		nextBySel: function(el, selector) {
			return _sibling(el, 'nextElementSibling', SELECTOR, selector);
		},
		
		/**
		 * Returns the next element sibling with given CSS class.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	className	CSS class name
		 * @return	{(Element|null)}	null if there is no next sibling element or it does not have the class set
		 */
		nextByClass: function(el, className) {
			return _sibling(el, 'nextElementSibling', CLASS_NAME, className);
		},
		
		/**
		 * Returns the next element sibling with given CSS class.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	className	CSS class name
		 * @return	{(Element|null)}	null if there is no next sibling element or it does not have the class set
		 */
		nextByTag: function(el, tagName) {
			return _sibling(el, 'nextElementSibling', CLASS_NAME, className);
		},
		
		/**
		 * Returns the previous element sibling.
		 * 
		 * @param	{Element}	el		element
		 * @return	{(Element|null)}	null if there is no previous sibling element
		 */
		prev: function(el) {
			return _sibling(el, 'previousElementSibling', NONE, null);
		},
		
		/**
		 * Returns the previous element sibling that matches the given selector.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	selector	CSS selector to match parent nodes against
		 * @return	{(Element|null)}	null if there is no previous sibling element or it does not match the selector
		 */
		prevBySel: function(el, selector) {
			return _sibling(el, 'previousElementSibling', SELECTOR, selector);
		},
		
		/**
		 * Returns the previous element sibling with given CSS class.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	className	CSS class name
		 * @return	{(Element|null)}	null if there is no previous sibling element or it does not have the class set
		 */
		prevByClass: function(el, className) {
			return _sibling(el, 'previousElementSibling', CLASS_NAME, className);
		},
		
		/**
		 * Returns the previous element sibling with given CSS class.
		 * 
		 * @param	{Element}	el		element
		 * @param	{string}	className	CSS class name
		 * @return	{(Element|null)}	null if there is no previous sibling element or it does not have the class set
		 */
		prevByTag: function(el, tagName) {
			return _sibling(el, 'previousElementSibling', CLASS_NAME, className);
		}
	};
	
	return new DOMTraverse();
});