!(function(g){
	"use strict";
	if(!document.head){
		document.head = document.getElementsByTagName('head')[0];
	}
	/**
	 * @param {String} obj 
	 */
	let isString = obj => (typeof '' === typeof obj);
	/**
	 * @param {Array} obj 
	 */
	let isArray = obj => (obj.length != null && obj.push === Array.prototype.push);
	/**
	 * @param {()=>any} obj 
	 */
	let isFunction = obj => (typeof parseInt === typeof obj);

	/**
	 * @typedef {Object} Module
	 * @property {Object} exports
	 * @property {_Mod} _mod
	 * 
	 * @typedef {Object} _Mod
	 * @property {String} name
	 * @property {String} url
	 * @property {*[]} dep
	 * @property {*} factory
	 */

	/**
	 * modules, each of which has inited
	 * @type {Module[]}
	*/
	let moduleArray = [];

	/**
	 * load amd module from src
	 * @param {String} src 
	 */
	let requireModule = async function(src){
		let loadedMod = moduleArray.find(i=> i._mod.url===src);
		let out;
		if(loadedMod){
			out = loadedMod.exports;
		}else{
			let {moduleFactory} = await loadAMDFile(src);
			if(moduleFactory._mod.dep){
				out = moduleFactory._mod.factory();
			}else{
				out = moduleFactory._mod.factory(
					function(){
						throw new Error('require is not supported!')
					},
					moduleFactory.exports,
					moduleFactory,
				);
				if(out==null) out = moduleFactory.exports;
			}
			moduleFactory.exports = out;
			delete moduleFactory._mod.factory;
			moduleArray.push(moduleFactory);
		}
		console.log(moduleArray);
		return out;
	};

	/**
	 * append js file to document
	 * @param {String} src 
	 * @param {(this:HTMLScriptElement,e:Event)=>} onload 
	 * @param {(this:HTMLScriptElement,e:Event)=>} onerror 
	 */
	let loadScriptFile = function(src,onload,onerror){
		let scriptTag = document.createElement('script');
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.type = 'text/javascript';
		scriptTag.charset = 'UTF-8';
		scriptTag.onload = onload;
		scriptTag.onerror = onerror;
		scriptTag.src = src;
		document.head.appendChild(scriptTag);
	};

	/**
	 * load amd, get the factory function
	 * @param {String} src 
	 * @return {Promise<{event:Event,scriptTag:HTMLScriptElement,moduleFactory:Module}>}
	 */
	let loadAMDFile = function(src){
		return new Promise((resolve,reject)=>{
			loadScriptFile(src,function(event){
				document.head.removeChild(this);

				let moduleFactory = factoryArray;
				factoryArray = null;
				moduleFactory._mod.url = src;
				if(!moduleFactory._mod.name) moduleFactory._mod.name = src;

				resolve({
					event,
					scriptTag:this,
					moduleFactory,
				});
			},function(event){
				document.head.removeChild(this);
				reject(new Error(`Failed to load: ${src}`));
			});
		});
	};

	/*
		define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
			exports.verb = function() {
				return beta.verb();
				//Or:
				return require("beta").verb();
			}
		});

		define(function (require, exports, module) {
			var a = require('a'),
				b = require('b');

			exports.action = function () {};
		});
	*/

	/**
	 * module which has not inited yet, has a factory function
	 * @type {Module}
	 */
	let factoryArray;

	let define = function(...args){
		/**@type {Module} */
		let mod = {
			exports:{},
			_mod:{
				name:'',
				url:'',
				dep:null,
				factory:null,
			}
		};
		let exports = mod.exports;
		let arg = args.shift();

		if(isString(arg)){
			mod._mod.name = arg;
			arg = args.shift();
		}

		if(isArray(arg)){
			mod._mod.dep = arg;
			arg = args.shift();
		}

		if(isFunction(arg)){
			mod._mod.factory = arg;
		}
		factoryArray = mod;
	};
	define.amd = {};
	g.requireModule = requireModule;
	requireModule.loadScriptFile = loadScriptFile;
	g.define = define;
})(this);
