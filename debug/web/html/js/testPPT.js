var testPPT = (function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : '/';

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	}
	// path.normalize(path)
	// posix version
	function normalize(path) {
	  var isPathAbsolute = isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isPathAbsolute).join('/');

	  if (!path && !isPathAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isPathAbsolute ? '/' : '') + path;
	}
	// posix version
	function isAbsolute(path) {
	  return path.charAt(0) === '/';
	}

	// posix version
	function join() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	}


	// path.relative(from, to)
	// posix version
	function relative(from, to) {
	  from = resolve(from).substr(1);
	  to = resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	}

	var sep = '/';
	var delimiter = ':';

	function dirname(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	}

	function basename(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	}


	function extname(path) {
	  return splitPath(path)[3];
	}
	var require$$0 = {
	  extname: extname,
	  basename: basename,
	  dirname: dirname,
	  sep: sep,
	  delimiter: delimiter,
	  relative: relative,
	  join: join,
	  isAbsolute: isAbsolute,
	  normalize: normalize,
	  resolve: resolve
	};
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ?
	    function (str, start, len) { return str.substr(start, len) } :
	    function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	var _dist = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });


	var path = require$$0;

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(runtime_1);
	var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (_isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	var $errorId = Symbol("OxjsError.errorId");
	/**
	 * class of extension exception
	 */

	var OxjsError = /*#__PURE__*/function (_Error) {
	  _inherits(OxjsError, _Error);

	  var _super = _createSuper(OxjsError);

	  function OxjsError(_id, _msg) {
	    var _this;

	    _classCallCheck(this, OxjsError);

	    _this = _super.call(this, _msg);
	    _this[$errorId] = Number(_id);
	    return _this;
	  }
	  /**
	   * id of the exception
	   */


	  _createClass(OxjsError, [{
	    key: "errorId",
	    get: function get() {
	      return this[$errorId];
	    }
	  }]);

	  return OxjsError;
	}( /*#__PURE__*/_wrapNativeSuper(Error));
	/**
	 * generate a new exception instance
	 * @param {*} _id the id
	 * @param {*} _message the description
	 */

	function Exception(_id, _message) {
	  return new OxjsError(_id, _message);
	}
	/**
	 * exception of no implementation
	 */

	function NO_IMPLEMENT(_tip) {
	  return Exception(1, _tip ? "".concat(_tip, " has not been implemented") : "the action in this condition has not been implemented");
	}
	/**
	 * exception of expecting a parameter
	 * @param {*} _tip tip of the parameter
	 */

	function EXPECT_PARAM(_tip) {
	  return Exception(2, _tip ? "expect param: ".concat(_tip) : "missing the valid parameters");
	}
	/**
	 * exception of fail in parsing xml
	 * @param {*} _tip message of the detail
	 */

	function XML_PARSE_FAIL(_tip) {
	  return Exception(3, _tip ? "fail in parse xml for \"".concat(_tip, "\"") : "fail in parse XML");
	}
	/**
	 * exception of no enough id
	 */

	var NO_ENOUGH_ID = Exception(4, "no enough ID");
	/**
	 * exception of data is not in the same package
	 * @param {*} _tip message of the detail
	 */

	function FROM_OTHER_PACKAGE(_tip) {
	  return Exception(5, _tip ? "resource(\"".concat(_tip, "\") is from a different package") : "resource is from a different package");
	}
	/**
	 * exception of fail in locating node
	 */

	function LOCATE_NODE_FAIL(_tip) {
	  return Exception(6, _tip ? "fail to locate the node(".concat(_tip, ") for operation") : "fail to locate the node for operation");
	}
	/**
	 * exception of fail in locating the resource
	 */

	function LOCATE_RESOURCE_FAIL(_tip) {
	  return Exception(7, _tip ? "fail to locate the resource for operation: ".concat(_tip) : "fail to locate the resource for operation");
	}
	/**
	 * exception of acquiring the resource
	 * @param {String} _tip message of the detail
	 */

	function ACQUIRE_RESOURCE_FAIL(_tip) {
	  return Exception(8, _tip ? "fail to acquire resource: ".concat(_tip) : "fail to acquire resource");
	}
	/**
	 * assert
	 * @param {*} _cond the expression of a condition to be checked
	 * @param {*} _error the exception will be thrown if the condition is false
	 * @returns {*} the result of the "_cond"
	 */

	function assert(_cond, _error) {
	  if (!_cond) {
	    throw _error || new OxjsError(NaN, "assert");
	  }

	  return _cond;
	}
	/**
	 * throw an exception if something is not implemented.
	 * uses for null interface
	 * @param {String} _tip the name of the action which is not implemented
	 */

	function NoImplemented(_tip) {
	  throw NO_IMPLEMENT(tip);
	}

	var error = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  OxjsError: OxjsError,
	  Exception: Exception,
	  NO_IMPLEMENT: NO_IMPLEMENT,
	  EXPECT_PARAM: EXPECT_PARAM,
	  XML_PARSE_FAIL: XML_PARSE_FAIL,
	  NO_ENOUGH_ID: NO_ENOUGH_ID,
	  FROM_OTHER_PACKAGE: FROM_OTHER_PACKAGE,
	  LOCATE_NODE_FAIL: LOCATE_NODE_FAIL,
	  LOCATE_RESOURCE_FAIL: LOCATE_RESOURCE_FAIL,
	  ACQUIRE_RESOURCE_FAIL: ACQUIRE_RESOURCE_FAIL,
	  assert: assert,
	  NoImplemented: NoImplemented
	});

	var constants = /*#__PURE__*/Object.freeze({
	  __proto__: null
	});

	/**
	 * declare readonly member(s) for an object
	 * @param {*} _obj the object which will be modified
	 * @param {String|Symbol|Object} _keyOrMap an object contains the members, or the name of the member
	 * @param {*} _value the value of the member, this parameter is used only when the 2rd paramter is the name of the member
	 */
	function readonly(_obj, _keyOrMap, _value) {
	  if (arguments.length > 2) {
	    Object.defineProperty(_obj, _keyOrMap, {
	      value: _value,
	      writable: false
	    });
	  } else {
	    for (var key in _keyOrMap) {
	      Object.defineProperty(_obj, key, {
	        value: _keyOrMap[key],
	        writable: false
	      });
	    }
	  }
	}

	/**
	 * generate a random ID
	 * @param {String} _prefix prefix of the destination id
	 * @param {*} _radix 
	 */
	function genRandId$1(_prefix, _radix) {
	  return "".concat(_prefix || "").concat(Date.now().toString(_radix)).concat(Math.random().toString(_radix).substr(2, 3));
	}

	var IDom = /*#__PURE__*/function () {
	  function IDom() {
	    _classCallCheck(this, IDom);
	  }

	  _createClass(IDom, [{
	    key: "xpathSelect",
	    value: function xpathSelect(_expression, _isSingle) {
	      NoImplemented();
	    }
	  }, {
	    key: "createElement",
	    value: function createElement() {
	      NoImplemented();
	    }
	  }, {
	    key: "createElementNS",
	    value: function createElementNS() {
	      NoImplemented();
	    }
	  }, {
	    key: "documentElement",
	    get: function get() {
	      NoImplemented();
	    }
	  }], [{
	    key: "parse",
	    value: function parse(_xmlString) {
	      NoImplemented();
	    }
	  }, {
	    key: "isElementNode",
	    value: function isElementNode(_obj) {
	      NoImplemented();
	    }
	  }]);

	  return IDom;
	}();

	var regenerator = regeneratorRuntime__default['default'];

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var IZip = /*#__PURE__*/function () {
	  function IZip() {
	    _classCallCheck(this, IZip);
	  }

	  _createClass(IZip, [{
	    key: "getFile",
	    value: function () {
	      var _getFile = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_file, _format) {
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                NoImplemented();

	              case 1:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee);
	      }));

	      function getFile(_x, _x2) {
	        return _getFile.apply(this, arguments);
	      }

	      return getFile;
	    }()
	  }, {
	    key: "setFile",
	    value: function setFile(_file, _content, _format) {
	      NoImplemented();
	    }
	  }, {
	    key: "load",
	    value: function () {
	      var _load = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_file) {
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                NoImplemented();

	              case 1:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      function load(_x3) {
	        return _load.apply(this, arguments);
	      }

	      return load;
	    }()
	  }, {
	    key: "save",
	    value: function () {
	      var _save = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                NoImplemented();

	              case 1:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3);
	      }));

	      function save() {
	        return _save.apply(this, arguments);
	      }

	      return save;
	    }()
	  }]);

	  return IZip;
	}();

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	/**
	 * Interface of an application enviroment
	 */

	var IApplication = function IApplication() {
	  _classCallCheck(this, IApplication);
	}
	/**
	 * The interface IZip for operating zip package
	 */
	;

	_defineProperty(IApplication, "ZIP", IZip);

	_defineProperty(IApplication, "DOM", IDom);

	var assert$1 = assert;
	var CONTENTTYPE_PATH = "[Content_Types].xml";
	var EMPTY_CONTENTTYPE_XML = '<?xml version="1.0" encoding="UTF-8" standalone="true"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>';
	/**
	 * class for operating the open xml package
	 */

	var OpenXmlPackage = /*#__PURE__*/function () {
	  /**
	   * construct an OpenXmlPackage object
	   * @param {IApplication} application the implementation of IApplication
	   * @param {IZip} zip an instance of IZip contains the package
	   * @param {String} _contentTypeXML the XML string of the "[Content_Types].xml"
	   */
	  function OpenXmlPackage(application, zip, _contentTypeXML) {
	    _classCallCheck(this, OpenXmlPackage);

	    readonly(this, {
	      application: application,
	      zip: zip,
	      contentTypes: application.DOM.parse(_contentTypeXML || EMPTY_CONTENTTYPE_XML)
	    });
	  }
	  /**
	   * save the current package
	   */


	  _createClass(OpenXmlPackage, [{
	    key: "save",
	    value: function save() {
	      var zip = this.zip;
	      zip.setFile(CONTENTTYPE_PATH, this.contentTypes.toString());
	      return zip.save();
	    }
	    /**
	     * 设置包中一个文件的内容
	     * @param {String} _path 文件在包中的路径
	     * @param {*} _data 文件的数据
	     * @param {String} _contentType 文件的内容类型，如果不传入该参数，则不更新文件的内容类型
	     */

	    /**
	     * set a file into the package
	     * if the file is already in the package, it will be replace
	     * @param {String} _path the path of the file in the package
	     * @param {*} _data the content of the file
	     * @param {String} _format the format of the content, support "binary" and "text"
	     * @param {String} _contentType the type of the content, see the stand of the OpenXML
	     */

	  }, {
	    key: "setFile",
	    value: function setFile(_path, _data, _format, _contentType) {
	      this.zip.setFile(_path, _data, _format);

	      if (_contentType) {
	        var dom = this.contentTypes;
	        var partName = "/".concat(_path).replace(/\\/ig, "/");
	        var contentTypes = assert$1(dom.xpathSelect("//*[local-name(.)='Types']", true), LOCATE_NODE_FAIL("Types in [content types].xml"));
	        var typeDesc = contentTypes.xpathSelect("./*[local-name(.)='Override' and @PartName='".concat(partName, "']"), true);

	        if (typeDesc) {
	          typeDesc.setAttribute("ContentType", _contentType);
	        } else {
	          var newItem = assert$1(dom.createElement("Override"), ACQUIRE_RESOURCE_FAIL('"Override" node in ContentType'));
	          newItem.setAttribute("ContentType", _contentType);
	          newItem.setAttribute("PartName", partName);
	          contentTypes.appendChild(newItem);
	        }
	      }
	    }
	    /**
	     * get a file from the package
	     * @param {String} _path the path of the file in the package
	     * @param {String} _format the format of the content, support "binary" and "text"
	     */

	  }, {
	    key: "getFile",
	    value: function getFile(_path, _format) {
	      return this.zip.getFile(_path, _format);
	    }
	    /**
	     * 设置一个扩展名对应的内容类型
	     * @param {String} _extension 扩展名
	     * @param {String} _type 扩展名对应的内容类型
	     */

	  }, {
	    key: "setExtensionType",
	    value: function setExtensionType(_extension, _type) {
	      var dom = this.contentTypes;
	      var contentTypes = assert$1(dom.xpathSelect("//*[local-name(.)='Types']", true), LOCATE_NODE_FAIL("Types in [content types].xml"));
	      _extension = _extension.replace(/^\./, "");
	      var typeDesc = contentTypes.xpathSelect("./*[local-name(.)='Default' and @Extension='".concat(_extension, "']"), true);

	      if (typeDesc) {
	        typeDesc.setAttribute("ContentType", _type);
	      } else {
	        var newItem = assert$1(dom.createElement("Default"), ACQUIRE_RESOURCE_FAIL('"Default" node in ContentType'));
	        newItem.setAttribute("ContentType", _type);
	        newItem.setAttribute("Extension", _extension);
	        contentTypes.appendChild(newItem);
	      }
	    }
	  }]);

	  return OpenXmlPackage;
	}();
	/**
	 * 
	 */


	var OpenXmlPackage$1 = {
	  /**
	   * Open a package, and return an instance of OpenXmlPackage
	   * @param {IApplication} _app an implementation of IApplication
	   * @param {*} _package any data of the package, the format dependent on the implementation of IZip
	   * @return {Promise<OpenXmlPackage>} a promise that will be resolved with an object of OpenXmlPackage
	   */
	  open: function open(_app, _package) {
	    return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	      var zip, contentTypeXML;
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (!IApplication.isPrototypeOf(_app)) {
	                _context.next = 9;
	                break;
	              }

	              _context.next = 3;
	              return new _app.ZIP().load(_package);

	            case 3:
	              zip = _context.sent;

	              if (!(zip instanceof IZip)) {
	                _context.next = 9;
	                break;
	              }

	              _context.next = 7;
	              return zip.getFile(CONTENTTYPE_PATH);

	            case 7:
	              contentTypeXML = _context.sent;
	              return _context.abrupt("return", new OpenXmlPackage(_app, zip, contentTypeXML));

	            case 9:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }))();
	  },

	  /**
	   * check if the input object is an instance of OpenXmlPackage class
	   * @param {*} _obj
	   */
	  isPackage: function isPackage(_obj) {
	    return _obj instanceof OpenXmlPackage;
	  },

	  /**
	   * extern the prototype of OpenXmlPackage class
	   * @param {Object} _obj 
	   */
	  extern: function extern(_obj) {
	    for (var item in _obj) {
	      OpenXmlPackage.prototype[item] = _obj[item];
	    }
	  }
	};

	var assert$2 = assert; // registed table for subclassed part

	var registedParts = {}; // XML for relationship file initialization

	var EMPTY_RELATIONSHRIP_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
	/**
	 * basic class of all OpenXML part
	 */

	var OpenXmlPart = /*#__PURE__*/function () {
	  _createClass(OpenXmlPart, null, [{
	    key: "getRelationshipPath",
	    //#region static members

	    /**
	     * get the path of the relationship file from the path of the part file path
	     * @param {*} _partPath the path of the part file
	     */
	    value: function getRelationshipPath(_partPath) {
	      var partDir = path__default['default'].dirname(_partPath);
	      var partFileName = path__default['default'].basename(_partPath);
	      return path__default['default'].join(partDir, "./_rels/".concat(partFileName, ".rels")).replace(/\\/ig, "/");
	    }
	    /**
	     * load and instance a part from a package
	     * @param {*} _package 
	     * @param {*} _path 
	     * @param {*} _opt 
	     */

	  }, {
	    key: "load",
	    value: function () {
	      var _load = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_package, _path, _opt) {
	        var _path2, relationshipPath, content, relationshipXML, opt;

	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!OpenXmlPackage$1.isPackage(_package)) {
	                  _context.next = 13;
	                  break;
	                }

	                _path2 = String(_path || this.DefaultPath).replace(/\\/ig, "/").replace(/^\//, "");
	                relationshipPath = OpenXmlPart.getRelationshipPath(_path2);
	                _context.next = 5;
	                return _package.getFile(_path2, this.ContentFormat);

	              case 5:
	                content = _context.sent;

	                if (!content) {
	                  _context.next = 13;
	                  break;
	                }

	                _context.next = 9;
	                return _package.getFile(relationshipPath, "text");

	              case 9:
	                relationshipXML = _context.sent;
	                opt = {
	                  path: _path2,
	                  content: content,
	                  relationshipPath: relationshipPath,
	                  relationshipXML: relationshipXML,
	                  "package": _package
	                };
	                _opt && Object.assign(opt, _opt);
	                return _context.abrupt("return", new this(opt));

	              case 13:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function load(_x, _x2, _x3) {
	        return _load.apply(this, arguments);
	      }

	      return load;
	    }()
	    /**
	     * convert the given part to the invoker class
	     * @param {OpenXmlPart} _part part which will be converted
	     * @param {*} _opt the extension options passed to the constructor of the invoker class
	     */

	  }, {
	    key: "convert",
	    value: function () {
	      var _convert = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_part, _opt) {
	        var path, relationshipPath, content, relationshipXML, opt;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                assert$2(_part instanceof OpenXmlPart, EXPECT_PARAM("_part must be instance of OpenXmlPart"));
	                path = _part.path;
	                relationshipPath = _part.relationshipPath;
	                _context2.next = 5;
	                return _part["package"].getFile(path, this.ContentFormat);

	              case 5:
	                content = _context2.sent;

	                if (!content) {
	                  _context2.next = 13;
	                  break;
	                }

	                _context2.next = 9;
	                return _part["package"].getFile(relationshipPath, "text");

	              case 9:
	                relationshipXML = _context2.sent;
	                opt = {
	                  path: path,
	                  content: content,
	                  relationshipPath: relationshipPath,
	                  relationshipXML: relationshipXML,
	                  "package": _part["package"]
	                };
	                _opt && Object.assign(opt, _opt);
	                return _context2.abrupt("return", new this(opt));

	              case 13:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function convert(_x4, _x5) {
	        return _convert.apply(this, arguments);
	      }

	      return convert;
	    }()
	    /**
	     * create a new part
	     * It should be override by the subclass if subclass needs this function
	     * @param {OpenXmlPackage} _package the package store the new part
	     * @param {String} _path the path in the package which the new part will save to
	     * @returns {OpenXmlPart} the instance of the new part
	     */

	  }, {
	    key: "create",
	    value: function () {
	      var _create = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_package, _path) {
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                NoImplemented("".concat(this.name, ".create"));

	              case 1:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function create(_x6, _x7) {
	        return _create.apply(this, arguments);
	      }

	      return create;
	    }()
	    /**
	     * string of the content's type, may be override by the subclass
	     */

	  }, {
	    key: "register",

	    /**
	     * register a subclass part
	     * @param {Class} _partClass class extends OpenXmlPart
	     */
	    value: function register(_partClass) {
	      assert$2(OpenXmlPart.isPrototypeOf(_partClass), EXPECT_PARAM("_partClass"));
	      assert$2(_partClass.SchemasURI, EXPECT_PARAM("_partclass.schemasURI"));
	      registedParts[_partClass.SchemasURI] = _partClass;
	      return _partClass;
	    } //#endregion

	  }]);

	  function OpenXmlPart(_opt) {
	    _classCallCheck(this, OpenXmlPart);

	    var opt = _opt || {};
	    assert$2(opt.path && opt.content, EXPECT_PARAM("opt.partPath & opt.partXML"));
	    assert$2(opt["package"], EXPECT_PARAM("opt.package"));
	    var relationshipDom = opt.relationshipXML && opt["package"].application.DOM.parse(opt.relationshipXML);
	    readonly(this, {
	      "package": opt["package"],
	      path: opt.path,
	      relationshipPath: opt.relationshipPath
	    });
	    relationshipDom && readonly(this, {
	      relationshipDom: relationshipDom
	    });
	  } //#region instance members

	  /**
	   * save this part into the package
	   */


	  _createClass(OpenXmlPart, [{
	    key: "commit",
	    value: function commit() {
	      var pkg = this["package"];

	      if (pkg) {
	        var content = this.content;
	        content && pkg.setFile(this.path, content, this.constructor.ContentType);
	        var relationshipDom = this.relationshipDom;
	        relationshipDom && pkg.setFile(this.relationshipPath, relationshipDom.toString(), "text");
	      }
	    }
	    /**
	     * check if two part in the same package
	     * @param {OpenXmlPart} _part the part to be checked
	     */

	  }, {
	    key: "inSamePackage",
	    value: function inSamePackage(_part) {
	      return _part && _part["package"] === this["package"];
	    }
	    /**
	     * duplicate the part
	     * @param {String} _path the path for the new part
	     * @param {OpenXmlPackage} _package the package the save the new part, takes current package if this parameter is empty
	     * @param {*} _opt the parameter passed to OpenXmlPart.load as the 3rd parameter
	     */

	  }, {
	    key: "duplicate",
	    value: function duplicate(_path, _package, _opt) {
	      var targetPackage = _package || this["package"];
	      var content = this.content; // this action is only valid when the content is not empty, and has a different path or in different package

	      if (content && (targetPackage !== this["package"] || _path !== this.path)) {
	        // copy the content and relationship content
	        targetPackage.setFile(_path, content, this.ContentFormat, this.constructor.ContentType);
	        var relationshipDom = this.relationshipDom;
	        relationshipDom && targetPackage.setFile(OpenXmlPart.getRelationshipPath(_path), relationshipDom.toString(), "text"); // TODO: to correct the relationship parts
	        // ...
	        // instance the new part object

	        return this.constructor.load(targetPackage, _path, _opt);
	      }
	    }
	    /**
	     * get a relation part
	     * @param {String|Class} _idOrClass id of the relation part, or a class of the relation part
	     */

	  }, {
	    key: "getRelationPart",
	    value: function () {
	      var _getRelationPart = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_idOrClass) {
	        var rels, nodeSel, typeAttr, targetPath, ctor, part;
	        return regenerator.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                rels = this.relationshipDom;

	                if (!rels) {
	                  _context4.next = 13;
	                  break;
	                }

	                nodeSel = OpenXmlPart.isPrototypeOf(_idOrClass) ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_idOrClass.SchemasURI, "']"), true) : rels.xpathSelect(".//*[local-name(.)='Relationship' and @Id='".concat(_idOrClass, "']"), true);

	                if (!nodeSel) {
	                  _context4.next = 13;
	                  break;
	                }

	                typeAttr = nodeSel.getAttribute("Type");
	                targetPath = String(nodeSel.getAttribute("Target")).replace(/\\/ig, "/");
	                path__default['default'].isAbsolute(targetPath) || (targetPath = path__default['default'].join(path__default['default'].dirname(this.path), targetPath));
	                ctor = registedParts[typeAttr] || OpenXmlPart;
	                _context4.next = 10;
	                return ctor.load(this["package"], targetPath);

	              case 10:
	                part = _context4.sent;
	                part && readonly(part, {
	                  relationshipId: String(nodeSel.getAttribute("id"))
	                });
	                return _context4.abrupt("return", part);

	              case 13:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function getRelationPart(_x8) {
	        return _getRelationPart.apply(this, arguments);
	      }

	      return getRelationPart;
	    }()
	    /**
	     * insert a part as the relation part of current part
	     * @param {OpenXmlPart} _part the part will be inserted
	     */

	  }, {
	    key: "insertRelationPart",
	    value: function insertRelationPart(_part) {
	      assert$2(_part instanceof OpenXmlPart, EXPECT_PARAM("_part"));
	      var targetRelPath = path__default['default'].relative(path__default['default'].dirname(this.path), _part.path).replace(/\\/ig, "/");
	      var rid = genRandId$1("R", 16);
	      var rels = this.relationshipDom;

	      if (!rels) {
	        readonly(this, {
	          relationshipDom: this["package"].application.DOM.parse(EMPTY_RELATIONSHRIP_XML)
	        });
	        rels = this.relationshipDom;
	      }

	      assert$2(rels, ACQUIRE_RESOURCE_FAIL("Relationship DOM"));
	      var relNode = rels.createElement("Relationship");
	      assert$2(relNode, ACQUIRE_RESOURCE_FAIL("Relationship Node"));
	      relNode.setAttribute("Target", targetRelPath);
	      relNode.setAttribute("Type", _part.constructor.SchemasURI);
	      relNode.setAttribute("Id", rid);
	      rels.documentElement.appendChild(relNode);
	      return rid;
	    }
	    /**
	     * generate a iterator for relation parts
	     * @param {String|Class|undefined} _class   class of the target part, 
	     *                                          or the string of target part's type, 
	     *                                          undefined for iterate all relation parts
	     */

	  }, {
	    key: "relationParts",
	    value: /*#__PURE__*/regenerator.mark(function relationParts(_class) {
	      var rels, nodeList, curDir, index, node, relationshipId, type, target, ctor;
	      return regenerator.wrap(function relationParts$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              rels = this.relationshipDom;

	              if (!rels) {
	                _context5.next = 18;
	                break;
	              }

	              nodeList = OpenXmlPart.isPrototypeOf(_class) ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_class.SchemasURI, "']")) : typeof _class === "string" ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_class, "']")) : rels.xpathSelect(".//*[local-name(.)='Relationship']");

	              if (!nodeList) {
	                _context5.next = 18;
	                break;
	              }

	              curDir = path__default['default'].dirname(this.path);
	              _context5.t0 = regenerator.keys(nodeList);

	            case 6:
	              if ((_context5.t1 = _context5.t0()).done) {
	                _context5.next = 18;
	                break;
	              }

	              index = _context5.t1.value;
	              node = nodeList[index];
	              relationshipId = node.getAttribute("id");
	              type = node.getAttribute("Type");
	              target = String(node.getAttribute("Target")).replace(/\\/ig, "/");
	              path__default['default'].isAbsolute(target) || (target = path__default['default'].join(curDir, target));
	              ctor = registedParts[type] || OpenXmlPart;
	              _context5.next = 16;
	              return {
	                index: index,
	                relationshipId: relationshipId,
	                target: target,
	                "class": ctor,
	                type: type,
	                node: node
	              };

	            case 16:
	              _context5.next = 6;
	              break;

	            case 18:
	            case "end":
	              return _context5.stop();
	          }
	        }
	      }, relationParts, this);
	    }) //#endregion

	  }]);

	  return OpenXmlPart;
	}();

	_defineProperty(OpenXmlPart, "ContentType", undefined);

	_defineProperty(OpenXmlPart, "SchemasURI", undefined);

	_defineProperty(OpenXmlPart, "ContentFormat", "text");

	_defineProperty(OpenXmlPart, "DefaultPath", "");

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of all OpenXML part which content is binary
	 * @extends OpenXmlPart
	 */

	var OpenXmlBinaryPart = /*#__PURE__*/function (_OpenXmlPart) {
	  _inherits(OpenXmlBinaryPart, _OpenXmlPart);

	  var _super = _createSuper$1(OpenXmlBinaryPart);

	  function OpenXmlBinaryPart(_opt) {
	    var _this;

	    _classCallCheck(this, OpenXmlBinaryPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), {
	      content: _opt.content
	    });
	    return _this;
	  }

	  return OpenXmlBinaryPart;
	}(OpenXmlPart);

	_defineProperty(OpenXmlBinaryPart, "ContentFormat", "binary");

	/**
	 * basic class of OpenXML attributes
	 */

	var OpenXmlAttribute = /*#__PURE__*/function () {
	  /**
	   * construct an Open XML attribute
	   * @param {String} _localName the local name of the attribute
	   * @param {String} _nsURI the uri of the name-space of the attribute
	   * @param {String} _defPrefix the default prefix of the attribute's name-space
	   * @param {Object} _opt the extend options, can be undefined
	   *                      format is { default: default-value, checker: func-to-check-the-value }
	   */
	  function OpenXmlAttribute(_localName, _nsURI, _defPrefix, _opt) {
	    _classCallCheck(this, OpenXmlAttribute);

	    Object.defineProperties(this, {
	      localName: {
	        value: String(_localName),
	        writable: false
	      },
	      defaultPrefix: {
	        value: _defPrefix && String(_defPrefix),
	        writable: false
	      },
	      namespaceUri: {
	        value: String(_nsURI),
	        writable: false
	      },
	      options: {
	        value: _opt || {},
	        writable: false
	      }
	    });
	  }
	  /**
	   * get the qualified name of the attribute
	   * it contains the prefix of the name-space and the local-name
	   * @param {Node} _node 
	   */


	  _createClass(OpenXmlAttribute, [{
	    key: "qualifiedName",
	    value: function qualifiedName(_node) {
	      var prefix = _node.lookupPrefix(this.namespaceUri) || this.defaultPrefix;
	      return prefix ? "".concat(prefix, ":").concat(this.localName) : this.localName;
	    }
	    /**
	     * adjust the input value of the attribute
	     * @param {*} _val the input value
	     */

	  }, {
	    key: "adjustValue",
	    value: function adjustValue(_val) {
	      arguments.length <= 0 && (_val = this.options["default"]);
	      var fn = this.options.checker;
	      return fn ? fn(_val) : _val;
	    }
	    /**
	     * get the value of the attribute
	     * @param {Node} _node
	     */

	  }, {
	    key: "getValue",
	    value: function getValue(_node) {
	      var ns = this.namespaceUri;
	      return ns ? _node.getAttributeNS(ns, this.localName) : _node.getAttribute(this.qualifiedName(_node));
	    }
	    /**
	     * set the value of the attribute
	     * @param {Node} _node 
	     * @param {*} _val
	     */

	  }, {
	    key: "setValue",
	    value: function setValue(_node, _val) {
	      _val = this.adjustValue(_val);
	      var ns = this.namespaceUri;
	      ns ? _node.setAttributeNS(ns, this.qualifiedName(_node), _val) : _node.setAttribute(this.localName, _val);
	    }
	    /**
	     * delete the attribute
	     * @param {Node} _node
	     */

	  }, {
	    key: "remove",
	    value: function remove(_node) {
	      var ns = this.namespaceUri;
	      ns ? _node.removeAttributeNS(ns, this.localName) : _node.removeAttribute(this.qualifiedName(_node));
	    }
	    /**
	     * generate a xpath expression part
	     * @param {*} _val value for select, can ignore this parameter
	     */

	  }, {
	    key: "xpath",
	    value: function xpath(_val) {
	      return "@*[local-name(.)='".concat(this.localName, "' and namespace-uri(.)='").concat(this.namespaceUri, "' ").concat(arguments.length > 0 ? "and string(.)='".concat(_val, "'") : "", "]");
	    }
	    /**
	     * generate a xpath expression part for searching any attribute with the val
	     * @param {*} _val 
	     */

	  }], [{
	    key: "xpathVal",
	    value: function xpathVal(_val) {
	      return "@*[string(.)='".concat(_val, "']");
	    }
	  }]);

	  return OpenXmlAttribute;
	}();

	function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	var assert$3 = assert;
	/**
	 * register map for subclass OpenXML elements
	 */

	var registedElements = {};
	/**
	 * basic class of all OpenXml Element
	 */

	var OpenXmlElement = /*#__PURE__*/function () {
	  function OpenXmlElement(_node, _options) {
	    _classCallCheck(this, OpenXmlElement);

	    assert$3(_node, EXPECT_PARAM("_node"));
	    readonly(this, {
	      node: _node
	    });

	    if (_options) {
	      var children = _options.children || [];

	      var _iterator = _createForOfIteratorHelper(children),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var item = _step.value;
	          assert$3(item instanceof OpenXmlElement, EXPECT_PARAM("item in options.children must be instance of OpenXmlElement"));

	          _node.appendChild(item.node);
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    }
	  } //#region members should be override by subclass

	  /**
	   * the local name of this kind of element's node
	   */


	  _createClass(OpenXmlElement, [{
	    key: "children",
	    //#endregion
	    //#region instance methods

	    /**
	     * search all children matched the parameter
	     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
	     *                                                       function will match any children by default if ignore this parameter.
	     */
	    value: function children(_arg) {
	      var selectExp = this.constructor.genXPath("./", _arg);
	      var nodes = this.node.xpathSelect(selectExp);
	      return nodes ? nodes.map(function (node) {
	        return OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node;
	      }) : [];
	    }
	    /**
	     * search all descendants matched the parameter
	     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
	     *                                                       function will match any descendants by default if ignore this parameter.
	     */

	  }, {
	    key: "descendants",
	    value: function descendants(_arg) {
	      var selectExp = this.constructor.genXPath(".//", _arg);
	      var nodes = this.node.xpathSelect(selectExp);
	      return nodes ? nodes.map(function (node) {
	        return OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node;
	      }) : [];
	    }
	    /**
	     * search the first children matched the parameter
	     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
	     *                                                       function will match any children by default if ignore this parameter.
	     */

	  }, {
	    key: "childOne",
	    value: function childOne(_arg) {
	      var selectExp = this.constructor.genXPath("./", _arg);
	      var node = this.node.xpathSelect(selectExp, true);
	      return node && (OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node);
	    }
	    /**
	     * search the first descendant matched the parameter
	     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
	     *                                                       function will match any descendant by default if ignore this parameter.
	     */

	  }, {
	    key: "descendantOne",
	    value: function descendantOne(_arg) {
	      var selectExp = this.constructor.genXPath(".//", _arg);
	      var node = this.node.xpathSelect(selectExp, true);
	      return node && (OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node);
	    }
	    /**
	     * append a element as the last child of the current element
	     * @param {OpenXmlElement} _element the element will be append
	     */

	  }, {
	    key: "appendChild",
	    value: function appendChild(_element) {
	      assert$3(_element instanceof OpenXmlElement, EXPECT_PARAM("_element"));
	      this.node.appendChild(_element.node);
	    }
	    /**
	     * insert a element as a child of this element in a special postion
	     * @param {OpenXmlElement} _element the element will be inserted
	     * @param {Number} _position the index of the element will be inserted in, ignore this parameter will insert the element at the end of this element.
	     */

	  }, {
	    key: "insertChild",
	    value: function insertChild(_element, _position) {
	      assert$3(_element instanceof OpenXmlElement, EXPECT_PARAM("_element"));
	      var nodeList = this.node.childNodes;
	      this.node.insertBefore(_element.node, nodeList && typeof _position === "number" && _position >= 0 && _position < nodeList.length ? nodeList[_position] : null);
	    }
	    /**
	     * insert a element as the sibling of the current element
	     * @param {OpenXmlElement} _element the element will be inserted
	     * @param {Boolean} _before true for insert before the current element, false for insert after the current element
	     */

	  }, {
	    key: "insertAsSibling",
	    value: function insertAsSibling(_element, _before) {
	      assert$3(_element instanceof OpenXmlElement, EXPECT_PARAM("_element"));
	      var refNode = this.node;
	      var parent = refNode.parentNode;
	      parent && parent.insertBefore(_element.node, _before ? refNode : refNode.nextSibling);
	    }
	    /**
	     * create a new element of the given class
	     * @param {Class} _elementClass the class of the new element
	     * @param {*} _options the options for the creation action
	     */

	  }, {
	    key: "createElement",
	    value: function createElement(_elementClass, _options) {
	      assert$3(OpenXmlElement.isPrototypeOf(_elementClass), EXPECT_PARAM("_elementClass"));
	      return _elementClass.createElement(this.node.ownerDocument, this, _options);
	    }
	    /**
	     * remove the current from the DOM
	     */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var parent = this.node.parentNode;
	      parent && parent.removeChild(this.node);
	    }
	    /**
	     * set a attribute
	     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
	     * @param {*} _val value of the attribute
	     */

	  }, {
	    key: "setAttribute",
	    value: function setAttribute(_attr, _val) {
	      _attr instanceof OpenXmlAttribute ? _attr.setValue(this.node, _val) : this.node.setAttribute(String(_attr), _val);
	    }
	    /**
	     * get the value of the given attribute
	     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
	     */

	  }, {
	    key: "getAttribute",
	    value: function getAttribute(_attr) {
	      return _attr instanceof OpenXmlAttribute ? _attr.getValue(this.node) : this.node.getAttribute(String(_attr));
	    }
	    /**
	     * remove the given attribute
	     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
	     */

	  }, {
	    key: "removeAttribute",
	    value: function removeAttribute(_attr) {
	      return _attr instanceof OpenXmlAttribute ? _attr.remove(this.node) : this.node.removeAttribute(String(_attr));
	    } //#endregion

	  }, {
	    key: "prefix",
	    //#endregion
	    //#region instance properties

	    /**
	     * get the prefix name
	     */
	    get: function get() {
	      return this.node.prefix;
	    }
	    /**
	     * get the local name
	     */

	  }, {
	    key: "localName",
	    get: function get() {
	      return this.node.localName;
	    }
	    /**
	     * get the qualified name
	     */

	  }, {
	    key: "qualifiedName",
	    get: function get() {
	      return this.node.nodeName;
	    }
	    /**
	     * get the text content of this instance
	     */

	  }, {
	    key: "textContent",
	    get: function get() {
	      return this.node.textContent;
	    }
	    /**
	     * set the text content of this instance
	     */
	    ,
	    set: function set(_val) {
	      this.node.textContent = _val;
	    }
	    /**
	     * get the class name of this instance
	     */

	  }, {
	    key: "className",
	    get: function get() {
	      return this.constructor.name;
	    }
	  }], [{
	    key: "register",
	    //#endregion
	    //#region static members

	    /**
	     * register a subclass
	     * @param {Class} _elementClass a subclass entends OpenXmlElement
	     */
	    value: function register(_elementClass) {
	      assert$3(_elementClass && OpenXmlElement.isPrototypeOf(_elementClass), EXPECT_PARAM("_elementClass"));
	      assert$3(_elementClass.NamespaceUri, EXPECT_PARAM("".concat(_elementClass.name, ".NamespaceUri")));
	      var key = "".concat(_elementClass.NamespaceUri, "::").concat(_elementClass.LocalName);
	      registedElements[key] = _elementClass;
	      return _elementClass;
	    }
	    /**
	     * get the prefix in the range of a element
	     * this function is not getting the prefix name for the input element but for the invoker class
	     * @param {OpenXmlElement} _element
	     */

	  }, {
	    key: "prefix",
	    value: function prefix(_element) {
	      return _element instanceof OpenXmlElement && _element.node.lookupPrefix(this.NamespaceUri) || this.DefaultPrefix;
	    }
	    /**
	     * get the qualified name in the range of a element
	     * this function is not getting the qualified name for the input element but for the invoker class
	     * @param {OpenXmlElement} _element
	     */

	  }, {
	    key: "qualifiedName",
	    value: function qualifiedName(_element) {
	      var singleTagName = this.LocalName;
	      assert$3(singleTagName, NO_IMPLEMENT("".concat(this.name, ".LocalName")));
	      var prefixName = this.prefix(_element);
	      return prefixName ? "".concat(prefixName, ":").concat(singleTagName) : singleTagName;
	    }
	    /**
	     * instanced an OpenXMLElement object for the input node
	     * @param {Element} _node
	     */

	  }, {
	    key: "instanced",
	    value: function instanced(_node) {
	      if (_node && 1 === _node.nodeType) {
	        var key = "".concat(_node.namespaceURI, "::").concat(_node.localName);
	        var ctor = registedElements[key] || OpenXmlElement;
	        return new ctor(_node);
	      }
	    }
	    /**
	     * check if the input node matched to the invoker class
	     * @param {Element} _node
	     */

	  }, {
	    key: "isMatchedNode",
	    value: function isMatchedNode(_node) {
	      return _node && _node.namespaceURI === this.NamespaceUri && _node.localName === this.LocalName;
	    }
	    /**
	     * create a new element of the invoker class
	     * @param {IDOM|Document} _dom the isntance of the IDOM for creating element
	     * @param {Element} _parentElement the parent element which will contain the new element
	     * @param {*} _options the options for the creation action
	     */

	  }, {
	    key: "createElement",
	    value: function createElement(_dom, _parentElement, _options) {
	      assert$3(_dom, EXPECT_PARAM("_dom"));

	      var node = _dom.createElementNS(this.NamespaceUri, this.qualifiedName(_parentElement));

	      if (node) {
	        var element = new this(node, _options);
	        this.createDetail(element, _options);
	        return element;
	      }
	    }
	    /**
	     * the action for preparing the detail data of a new instance
	     * @param {OpenXmlElement} _element the target element
	     * @param {*} _options the options for the creation action
	     */

	  }, {
	    key: "createDetail",
	    value: function createDetail(_element, _options) {// assert(_element instanceof this, error.EXPECT_PARAM(`_element must be instance of ${this.name}`));
	    }
	    /**
	     * generate a xpath part of this class
	     * @param {String} _custom some custom expression part, can be ignored.
	     */

	  }, {
	    key: "xpath",
	    value: function xpath(_custom) {
	      return "*[local-name(.)='".concat(this.LocalName, "' and namespace-uri(.)='").concat(this.NamespaceUri, "' ").concat(_custom || "", "]");
	    }
	    /**
	     * generate a xpath expression for searching
	     * @param {String} _prefix the prefix expression, such as "./", ".//", and so on
	     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
	     *                                                       function will take "*" by default if ignore this parameter.
	     */

	  }, {
	    key: "genXPath",
	    value: function genXPath(_prefix, _arg) {
	      return "".concat(_prefix).concat((_arg instanceof OpenXmlAttribute || OpenXmlElement.isPrototypeOf(_arg)) && _arg.xpath() || _arg || "*");
	    }
	  }]);

	  return OpenXmlElement;
	}();

	_defineProperty(OpenXmlElement, "LocalName", undefined);

	_defineProperty(OpenXmlElement, "DefaultPrefix", undefined);

	_defineProperty(OpenXmlElement, "NamespaceUri", undefined);

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of all OpenXML part which content is XML
	 * @extends OpenXmlPart
	 */

	var OpenXmlPurePart = /*#__PURE__*/function (_OpenXmlPart) {
	  _inherits(OpenXmlPurePart, _OpenXmlPart);

	  var _super = _createSuper$2(OpenXmlPurePart);

	  function OpenXmlPurePart(_opt) {
	    var _this;

	    _classCallCheck(this, OpenXmlPurePart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), {
	      contentDom: _opt["package"].application.DOM.parse(_opt.content)
	    });
	    return _this;
	  }
	  /**
	   * get the data of the content
	   */


	  _createClass(OpenXmlPurePart, [{
	    key: "createElement",

	    /**
	     * create a new element of the given class
	     * @param {Class} _elementClass the class of the new element
	     * @param {*} _options the options for the creation action
	     */
	    value: function createElement(_elementClass, _options) {
	      var root = this.primaryElement;

	      if (root) {
	        return root.createElement(_elementClass, _options);
	      } else {
	        return _elementClass.createElement && _elementClass.createElement(this.contentDom, null, _options);
	      }
	    }
	  }, {
	    key: "content",
	    get: function get() {
	      return this.contentDom.toString();
	    }
	    /**
	     * get the instance of OpenXmlElement for the primary element in the DOM
	     */

	  }, {
	    key: "primaryElement",
	    get: function get() {
	      return OpenXmlElement.instanced(this.contentDom.documentElement);
	    }
	  }]);

	  return OpenXmlPurePart;
	}(OpenXmlPart);

	var relationship = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

	var namespaceURI = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  relationship: relationship
	});

	var AttrRelationshipId = new OpenXmlAttribute("id", relationship, "r");

	var AttrEmbed = new OpenXmlAttribute("embed", relationship, "r");

	var index = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  AttrRelationshipId: AttrRelationshipId,
	  AttrEmbed: AttrEmbed,
	  namespaceURI: namespaceURI
	});

	var main = "http://schemas.openxmlformats.org/presentationml/2006/main";

	var namespaceURI$1 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  main: main
	});

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class for elements defined in presentation2006
	 */

	var Presentation2006 = /*#__PURE__*/function (_OpenXmlElement) {
	  _inherits(Presentation2006, _OpenXmlElement);

	  var _super = _createSuper$3(Presentation2006);

	  //#region override the key information
	  //#endregion
	  function Presentation2006(_node, _options) {
	    _classCallCheck(this, Presentation2006);

	    return _super.call(this, _node, _options);
	  }

	  return Presentation2006;
	}(OpenXmlElement);

	_defineProperty(Presentation2006, "NamespaceUri", main);

	_defineProperty(Presentation2006, "DefaultPrefix", "p");

	var _class, _temp;

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the slide's id, element with tag "sldId"
	 * @class SlideId
	 */

	var SlideId = OpenXmlElement.register((_temp = _class = /*#__PURE__*/function (_Presentations) {
	  _inherits(SlideId, _Presentations);

	  var _super = _createSuper$4(SlideId);

	  //#region override the key information
	  //#endregion
	  function SlideId(_node, _options) {
	    _classCallCheck(this, SlideId);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the relationship ID
	   */


	  _createClass(SlideId, [{
	    key: "relationshipId",
	    get: function get() {
	      var id = this.getAttribute(AttrRelationshipId);

	      if (!id) {
	        id = genRandId$1("R");
	        this.setAttribute(AttrRelationshipId, id);
	      }

	      return id;
	    }
	    /**
	     * set the relationship ID
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute(AttrRelationshipId, _val || utility.genRandId("R", 16));
	    }
	    /**
	     * get the ID
	     */

	  }, {
	    key: "id",
	    get: function get() {
	      return this.getAttribute("id");
	    }
	    /**
	     * set the ID
	     */
	    ,
	    set: function set(_val) {
	      _val = Number(_val);
	      isNaN(_val) || this.setAttribute("id", _val);
	    }
	  }]);

	  return SlideId;
	}(Presentation2006), _defineProperty(_class, "LocalName", "sldId"), _temp));

	var _class$1, _temp$1;

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the list of the slide's ID, element with tag "sldIdLst"
	 * @class SlideIdList
	 */

	var SlideIdList = OpenXmlElement.register((_temp$1 = _class$1 = /*#__PURE__*/function (_Presentations) {
	  _inherits(SlideIdList, _Presentations);

	  var _super = _createSuper$5(SlideIdList);

	  //#region override the key inforamtion
	  //#endregion
	  function SlideIdList(_node, _options) {
	    _classCallCheck(this, SlideIdList);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get count of the IDs
	   */


	  _createClass(SlideIdList, [{
	    key: "items",

	    /**
	     * get an iterator for enumerating all SlideIds
	     */
	    value: /*#__PURE__*/regenerator.mark(function items() {
	      var list, index;
	      return regenerator.wrap(function items$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              list = this.children(SlideId);
	              _context.t0 = regenerator.keys(list);

	            case 2:
	              if ((_context.t1 = _context.t0()).done) {
	                _context.next = 8;
	                break;
	              }

	              index = _context.t1.value;
	              _context.next = 6;
	              return {
	                index: index,
	                slideId: list[index]
	              };

	            case 6:
	              _context.next = 2;
	              break;

	            case 8:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, items, this);
	    })
	  }, {
	    key: "count",
	    get: function get() {
	      return this.children(SlideId).length;
	    }
	  }]);

	  return SlideIdList;
	}(Presentation2006), _defineProperty(_class$1, "LocalName", "sldIdLst"), _temp$1));

	var _class$2, _temp$2;

	function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the presetation, element with tag "presentation"
	 */

	var Presentation = OpenXmlElement.register((_temp$2 = _class$2 = /*#__PURE__*/function (_Presentations) {
	  _inherits(Presentation, _Presentations);

	  var _super = _createSuper$6(Presentation);

	  //#region override the key information
	  //#endregion
	  function Presentation(_node, _options) {
	    _classCallCheck(this, Presentation);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the list of the slide's id
	   */


	  _createClass(Presentation, [{
	    key: "slideIdList",
	    get: function get() {
	      var list = this.children(SlideIdList);

	      if (list.length <= 0) {
	        list = this.createElement(SlideIdList);
	        this.appendChild(list);
	      } else {
	        list = list[0];
	      }

	      return list;
	    }
	  }]);

	  return Presentation;
	}(Presentation2006), _defineProperty(_class$2, "LocalName", "presentation"), _temp$2));

	var _class$3, _temp$3;

	function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of element contains the nonvisual information, element with tag "cNvPr"
	 * @class NonVisualDrawingProperties
	 */

	var NonVisualDrawingProperties = OpenXmlElement.register((_temp$3 = _class$3 = /*#__PURE__*/function (_Presentations) {
	  _inherits(NonVisualDrawingProperties, _Presentations);

	  var _super = _createSuper$7(NonVisualDrawingProperties);

	  //#region override the key information
	  //#endregion
	  function NonVisualDrawingProperties(_node, _options) {
	    _classCallCheck(this, NonVisualDrawingProperties);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the name information
	   */


	  _createClass(NonVisualDrawingProperties, [{
	    key: "name",
	    get: function get() {
	      return this.getAttribute("name");
	    }
	    /**
	     * set the name information
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute("name", _val);
	    }
	    /**
	     * get the ID
	     */

	  }, {
	    key: "id",
	    get: function get() {
	      return this.getAttribute("id");
	    }
	    /**
	     * set the ID
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute("id", _val);
	    }
	    /**
	     * get the description
	     */

	  }, {
	    key: "description",
	    get: function get() {
	      return this.getAttribute("descr");
	    }
	    /**
	     * set the description
	     */
	    ,
	    set: function set(_val) {
	      return this.setAttribute("descr", _val);
	    }
	  }]);

	  return NonVisualDrawingProperties;
	}(Presentation2006), _defineProperty(_class$3, "LocalName", "cNvPr"), _temp$3));

	function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of the nonvisual properties
	 * @class NonVisualPropertiesBase
	 */

	var NonVisualPropertiesBase = /*#__PURE__*/function (_Presentations) {
	  _inherits(NonVisualPropertiesBase, _Presentations);

	  var _super = _createSuper$8(NonVisualPropertiesBase);

	  function NonVisualPropertiesBase(_node, _options) {
	    _classCallCheck(this, NonVisualPropertiesBase);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the name information
	   */


	  _createClass(NonVisualPropertiesBase, [{
	    key: "name",
	    get: function get() {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      return pr && pr.name;
	    }
	    /**
	     * set the name information
	     */
	    ,
	    set: function set(_val) {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      pr && (pr.name = _val);
	    }
	    /**
	     * get the ID information
	     */

	  }, {
	    key: "id",
	    get: function get() {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      return pr && pr.id;
	    }
	    /**
	     * set the ID information
	     */
	    ,
	    set: function set(_val) {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      pr && (pr.id = _val);
	    }
	    /**
	     * get the description
	     */

	  }, {
	    key: "description",
	    get: function get() {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      return pr && pr.description;
	    }
	    /**
	     * set the description
	     */
	    ,
	    set: function set(_val) {
	      var pr = this.childOne(NonVisualDrawingProperties);
	      pr && (pr.description = _val);
	    }
	  }]);

	  return NonVisualPropertiesBase;
	}(Presentation2006);

	var _class$4, _temp$4;

	function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the nonvisual properties of the shape's group, element with tag "nvGrpSpPr"
	 * @class NonVisualGroupShapeProperties
	 */

	var NonVisualGroupShapeProperties = OpenXmlElement.register((_temp$4 = _class$4 = /*#__PURE__*/function (_NonVisualPropertiesB) {
	  _inherits(NonVisualGroupShapeProperties, _NonVisualPropertiesB);

	  var _super = _createSuper$9(NonVisualGroupShapeProperties);

	  //#region override the key information
	  //#endregion
	  function NonVisualGroupShapeProperties(_node, _options) {
	    _classCallCheck(this, NonVisualGroupShapeProperties);

	    return _super.call(this, _node, _options);
	  }

	  return NonVisualGroupShapeProperties;
	}(NonVisualPropertiesBase), _defineProperty(_class$4, "LocalName", "nvGrpSpPr"), _temp$4));

	function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of all visual object in the slide
	 */

	var VisualSlideObject = /*#__PURE__*/function (_Presentations) {
	  _inherits(VisualSlideObject, _Presentations);

	  var _super = _createSuper$a(VisualSlideObject);

	  function VisualSlideObject(_node, _options) {
	    _classCallCheck(this, VisualSlideObject);

	    return _super.call(this, _node, _options);
	  }

	  return VisualSlideObject;
	}(Presentation2006);

	function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of all element contain a group of shape
	 * @class GroupShapeBase
	 */

	var GroupShapeBase = /*#__PURE__*/function (_VisualSlideObject) {
	  _inherits(GroupShapeBase, _VisualSlideObject);

	  var _super = _createSuper$b(GroupShapeBase);

	  function GroupShapeBase(_node, _options) {
	    _classCallCheck(this, GroupShapeBase);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the nonvisual properties
	   */


	  _createClass(GroupShapeBase, [{
	    key: "visualChildren",

	    /**
	     * get an iterator for enumerating the visual elements
	     */
	    value: /*#__PURE__*/regenerator.mark(function visualChildren() {
	      var list, idx, element;
	      return regenerator.wrap(function visualChildren$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              list = this.children("*");
	              _context.t0 = regenerator.keys(list);

	            case 2:
	              if ((_context.t1 = _context.t0()).done) {
	                _context.next = 10;
	                break;
	              }

	              idx = _context.t1.value;
	              element = list[idx];

	              if (!(element instanceof VisualSlideObject)) {
	                _context.next = 8;
	                break;
	              }

	              _context.next = 8;
	              return element;

	            case 8:
	              _context.next = 2;
	              break;

	            case 10:

	            case 11:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, visualChildren, this);
	    })
	  }, {
	    key: "nonVisualProperties",
	    get: function get() {
	      var pr = this.childOne(NonVisualGroupShapeProperties);

	      if (!pr) {
	        pr = this.createElement(NonVisualGroupShapeProperties);
	        pr && this.appendChild(pr);
	      }

	      return pr;
	    }
	  }]);

	  return GroupShapeBase;
	}(VisualSlideObject);

	var _class$5, _temp$5;

	function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the tree of the shapes, element with tag "spTree"
	 * @class ShapeTree
	 */

	var ShapeTree = OpenXmlElement.register((_temp$5 = _class$5 = /*#__PURE__*/function (_GroupShapeBase) {
	  _inherits(ShapeTree, _GroupShapeBase);

	  var _super = _createSuper$c(ShapeTree);

	  //#region override the key information
	  //#endregion
	  function ShapeTree(_node, _options) {
	    _classCallCheck(this, ShapeTree);

	    return _super.call(this, _node, _options);
	  }

	  return ShapeTree;
	}(GroupShapeBase), _defineProperty(_class$5, "LocalName", "spTree"), _temp$5));

	var _class$6, _temp$6;

	function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the common data of the slide, element with tag "cSld"
	 * @class CommonSlideDatas
	 */

	var CommonSlideData = OpenXmlElement.register((_temp$6 = _class$6 = /*#__PURE__*/function (_Presentations) {
	  _inherits(CommonSlideData, _Presentations);

	  var _super = _createSuper$d(CommonSlideData);

	  //#region override the key information
	  //#endregion
	  function CommonSlideData(_node, _options) {
	    _classCallCheck(this, CommonSlideData);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the tree of the shapes
	   */


	  _createClass(CommonSlideData, [{
	    key: "shapeTree",
	    get: function get() {
	      var tree = this.childOne(ShapeTree);

	      if (!tree) {
	        tree = this.createElement(ShapeTree);
	        tree && this.appendChild(tree);
	      }

	      return tree;
	    }
	  }]);

	  return CommonSlideData;
	}(Presentation2006), _defineProperty(_class$6, "LocalName", "cSld"), _temp$6));

	var _class$7, _temp$7;

	function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the slide, element with tag "sld"
	 */

	var Slide = OpenXmlElement.register((_temp$7 = _class$7 = /*#__PURE__*/function (_Presentations) {
	  _inherits(Slide, _Presentations);

	  var _super = _createSuper$e(Slide);

	  //#region override the key information
	  //#endregion
	  function Slide(_node, _options) {
	    _classCallCheck(this, Slide);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the common data of the slide
	   */


	  _createClass(Slide, [{
	    key: "commonData",
	    get: function get() {
	      var cSld = this.childOne(CommonSlideData);

	      if (!cSld) {
	        cSld = this.createElement(CommonSlideData);
	        cSld && this.appendChild(cSld);
	      }

	      return cSld;
	    }
	  }]);

	  return Slide;
	}(Presentation2006), _defineProperty(_class$7, "LocalName", "sld"), _temp$7));

	var _class$8, _temp$8;

	function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the nonvisual properties of the shape, element with tag "nvSpPr"
	 * @class NonVisualShapeProperties
	 */

	var NonVisualShapeProperties = OpenXmlElement.register((_temp$8 = _class$8 = /*#__PURE__*/function (_NonVisualPropertiesB) {
	  _inherits(NonVisualShapeProperties, _NonVisualPropertiesB);

	  var _super = _createSuper$f(NonVisualShapeProperties);

	  //#region override the key inforamtion
	  //#endregion
	  function NonVisualShapeProperties(_node, _options) {
	    _classCallCheck(this, NonVisualShapeProperties);

	    return _super.call(this, _node, _options);
	  }

	  return NonVisualShapeProperties;
	}(NonVisualPropertiesBase), _defineProperty(_class$8, "LocalName", "nvSpPr"), _temp$8));

	var _class$9, _temp$9;

	function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the nonvisual properties of the picture, element with tag "nvPicPr"
	 * @class NonVisualPictureProperties
	 */

	var NonVisualPictureProperties = OpenXmlElement.register((_temp$9 = _class$9 = /*#__PURE__*/function (_NonVisualPropertiesB) {
	  _inherits(NonVisualPictureProperties, _NonVisualPropertiesB);

	  var _super = _createSuper$g(NonVisualPictureProperties);

	  //#region override the key information
	  //#endregion
	  function NonVisualPictureProperties(_node, _options) {
	    _classCallCheck(this, NonVisualPictureProperties);

	    return _super.call(this, _node, _options);
	  }

	  return NonVisualPictureProperties;
	}(NonVisualPropertiesBase), _defineProperty(_class$9, "LocalName", "nvPicPr"), _temp$9));

	var _class$a, _temp$a;

	function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the shape's group, element with tag "grpSp"
	 * @class GroupShape
	 */

	var GroupShape = OpenXmlElement.register((_temp$a = _class$a = /*#__PURE__*/function (_GroupShapeBase) {
	  _inherits(GroupShape, _GroupShapeBase);

	  var _super = _createSuper$h(GroupShape);

	  //#region override the key information
	  //#endregion
	  function GroupShape(_node, _options) {
	    _classCallCheck(this, GroupShape);

	    return _super.call(this, _node, _options);
	  }

	  return GroupShape;
	}(GroupShapeBase), _defineProperty(_class$a, "LocalName", "grpSp"), _temp$a));

	var main$1 = "http://schemas.openxmlformats.org/drawingml/2006/main";

	var namespaceURI$2 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  main: main$1
	});

	function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class of all element defined in drawing2006
	 */

	var Drawing2006 = /*#__PURE__*/function (_OpenXmlElement) {
	  _inherits(Drawing2006, _OpenXmlElement);

	  var _super = _createSuper$i(Drawing2006);

	  //#region override the key information
	  //#endregion
	  function Drawing2006(_node) {
	    _classCallCheck(this, Drawing2006);

	    return _super.call(this, _node);
	  }

	  return Drawing2006;
	}(OpenXmlElement);

	_defineProperty(Drawing2006, "NamespaceUri", main$1);

	_defineProperty(Drawing2006, "DefaultPrefix", "a");

	var _class$b, _temp$b, _class2, _temp2, _class3, _temp3, _class4, _temp4;

	function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	/**
	 * class of the element with tag "a:t"
	 * @class Text
	 */

	var Text = OpenXmlElement.register((_temp$b = _class$b = /*#__PURE__*/function (_Drawing) {
	  _inherits(Text, _Drawing);

	  var _super = _createSuper$j(Text);

	  //#region override the key information
	  //#endregion
	  function Text(_node) {
	    _classCallCheck(this, Text);

	    return _super.call(this, _node);
	  }

	  return Text;
	}(Drawing2006), _defineProperty(_class$b, "LocalName", "t"), _temp$b)); //#endregion
	//#region a:r

	/**
	 * class of the element with tag "a:r"
	 * @class Run
	 */

	var Run = OpenXmlElement.register((_temp2 = _class2 = /*#__PURE__*/function (_Drawing2) {
	  _inherits(Run, _Drawing2);

	  var _super2 = _createSuper$j(Run);

	  //#region override the key information
	  //#endregion
	  function Run(_node) {
	    _classCallCheck(this, Run);

	    return _super2.call(this, _node);
	  }
	  /**
	   * get all text in the element
	   */


	  _createClass(Run, [{
	    key: "textContent",
	    get: function get() {
	      var items = this.descendants(Text).map(function (text) {
	        return text.textContent;
	      });
	      return items.join("");
	    }
	  }]);

	  return Run;
	}(Drawing2006), _defineProperty(_class2, "LocalName", "r"), _temp2)); //#endregion
	//#region a:p

	/**
	 * class of element with tag "a:p"
	 * @class Paragraph
	 */

	var Paragraph = OpenXmlElement.register((_temp3 = _class3 = /*#__PURE__*/function (_Drawing3) {
	  _inherits(Paragraph, _Drawing3);

	  var _super3 = _createSuper$j(Paragraph);

	  //#region override the key information
	  //#endregion
	  function Paragraph(_node) {
	    _classCallCheck(this, Paragraph);

	    return _super3.call(this, _node);
	  }
	  /**
	   * get all text in the element
	   */


	  _createClass(Paragraph, [{
	    key: "textContent",
	    get: function get() {
	      var items = this.descendants(Text).map(function (text) {
	        return text.textContent;
	      });
	      return items.join("");
	    }
	  }]);

	  return Paragraph;
	}(Drawing2006), _defineProperty(_class3, "LocalName", "p"), _temp3)); //#endregion
	//#region a:txBody

	/**
	 * class of element with tag "a:txBody"
	 * @class TextBody
	 */

	var TextBody = OpenXmlElement.register((_temp4 = _class4 = /*#__PURE__*/function (_Drawing4) {
	  _inherits(TextBody, _Drawing4);

	  var _super4 = _createSuper$j(TextBody);

	  //#region override the key information
	  //#endregion
	  function TextBody(_node) {
	    _classCallCheck(this, TextBody);

	    return _super4.call(this, _node);
	  }
	  /**
	   * get all text in the element
	   */


	  _createClass(TextBody, [{
	    key: "textContent",
	    get: function get() {
	      var items = this.descendants(Paragraph).map(function (p) {
	        return p.textContent;
	      });
	      return items.join("\r\n");
	    }
	  }]);

	  return TextBody;
	}(Drawing2006), _defineProperty(_class4, "LocalName", "txBody"), _temp4)); //#endregion

	var index$1 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  Text: Text,
	  Run: Run,
	  Paragraph: Paragraph,
	  TextBody: TextBody,
	  namespaceURI: namespaceURI$2
	});

	var _class$c, _temp$c;

	function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the shape, element with tag "sp"
	 */

	var Shape = OpenXmlElement.register((_temp$c = _class$c = /*#__PURE__*/function (_VisualSlideObject) {
	  _inherits(Shape, _VisualSlideObject);

	  var _super = _createSuper$k(Shape);

	  //#region override the key information
	  //#endregion
	  function Shape(_node, _options) {
	    _classCallCheck(this, Shape);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the nonvisual properties
	   */


	  _createClass(Shape, [{
	    key: "nonVisualProperties",
	    get: function get() {
	      var pr = this.childOne(NonVisualShapeProperties);

	      if (!pr) {
	        pr = this.createElement(NonVisualShapeProperties);
	        pr && this.appendChild(pr);
	      }

	      return pr;
	    }
	    /**
	     * get the text body object
	     */

	  }, {
	    key: "textBody",
	    get: function get() {
	      return this.childOne(TextBody);
	    }
	  }]);

	  return Shape;
	}(VisualSlideObject), _defineProperty(_class$c, "LocalName", "sp"), _temp$c));

	var _class$d, _temp$d;

	function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the picture, element with tag "pic"
	 * @class Picture
	 */

	var Picture = OpenXmlElement.register((_temp$d = _class$d = /*#__PURE__*/function (_VisualSlideObject) {
	  _inherits(Picture, _VisualSlideObject);

	  var _super = _createSuper$l(Picture);

	  //#region override the key information
	  //#endregion
	  function Picture(_node, _options) {
	    _classCallCheck(this, Picture);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the nonvisual properties
	   */


	  _createClass(Picture, [{
	    key: "nonVisualProperties",
	    get: function get() {
	      var pr = this.childOne(NonVisualPictureProperties);

	      if (!pr) {
	        pr = this.createElement(NonVisualPictureProperties);
	        pr && this.appendChild(pr);
	      }

	      return pr;
	    }
	  }]);

	  return Picture;
	}(VisualSlideObject), _defineProperty(_class$d, "LocalName", "pic"), _temp$d));

	var index$2 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  Presentation: Presentation,
	  SlideIdList: SlideIdList,
	  SlideId: SlideId,
	  Slide: Slide,
	  CommonSlideData: CommonSlideData,
	  NonVisualGroupShapeProperties: NonVisualGroupShapeProperties,
	  NonVisualShapeProperties: NonVisualShapeProperties,
	  NonVisualPictureProperties: NonVisualPictureProperties,
	  NonVisualDrawingProperties: NonVisualDrawingProperties,
	  ShapeTree: ShapeTree,
	  GroupShape: GroupShape,
	  Shape: Shape,
	  Picture: Picture,
	  namespaceURI: namespaceURI$1
	});

	var main$2 = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

	var namespaceURI$3 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  main: main$2
	});

	function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class for elements defined in wordprocessing2006
	 */

	var Wordprocessing2006 = /*#__PURE__*/function (_OpenXmlElement) {
	  _inherits(Wordprocessing2006, _OpenXmlElement);

	  var _super = _createSuper$m(Wordprocessing2006);

	  //#region override the key information
	  //#endregion
	  function Wordprocessing2006(_node, _options) {
	    _classCallCheck(this, Wordprocessing2006);

	    return _super.call(this, _node, _options);
	  }

	  return Wordprocessing2006;
	}(OpenXmlElement);

	_defineProperty(Wordprocessing2006, "NamespaceUri", main$2);

	_defineProperty(Wordprocessing2006, "DefaultPrefix", "w");

	var _class$e, _temp$e;

	function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var AttrValue = new OpenXmlAttribute("val", main$2, "w");
	/**
	 * class of the paragraph style id, element with tag "w:pStyle"
	 */

	var ParagraphStyleId = OpenXmlElement.register((_temp$e = _class$e = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(ParagraphStyleId, _Wordprocessing);

	  var _super = _createSuper$n(ParagraphStyleId);

	  //#region override the key information
	  //#endregion
	  function ParagraphStyleId(_node, _options) {
	    _classCallCheck(this, ParagraphStyleId);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the value
	   */


	  _createClass(ParagraphStyleId, [{
	    key: "value",
	    get: function get() {
	      return this.getAttribute(AttrValue);
	    }
	    /**
	     * set the relationship ID
	     */
	    ,
	    set: function set(_val) {
	      if (arguments.length > 0) {
	        this.setAttribute(AttrValue, _val);
	      } else {
	        this.remove();
	      }
	    }
	  }]);

	  return ParagraphStyleId;
	}(Wordprocessing2006), _defineProperty(_class$e, "LocalName", "pStyle"), _temp$e));

	var _class$f, _temp$f;

	function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the table style conditional formatting paragraph properties, element with tag "w:pPr"
	 */

	var StyleParagraphProperties = OpenXmlElement.register((_temp$f = _class$f = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(StyleParagraphProperties, _Wordprocessing);

	  var _super = _createSuper$o(StyleParagraphProperties);

	  //#region override the key information
	  //#endregion
	  function StyleParagraphProperties(_node, _options) {
	    _classCallCheck(this, StyleParagraphProperties);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the paragraph style id
	   */


	  _createClass(StyleParagraphProperties, [{
	    key: "paragraphStyleId",
	    get: function get() {
	      var element = this.childOne(ParagraphStyleId);
	      return element && element.value;
	    }
	    /**
	     * set the paragraph style id
	     */
	    ,
	    set: function set(_val) {
	      var element = this.childOne(ParagraphStyleId);

	      if (!element && arguments.length > 0) {
	        element = this.createElement(ParagraphStyleId);
	        element && this.appendChild(element);
	      }

	      element && (element.value = _val);
	    }
	  }]);

	  return StyleParagraphProperties;
	}(Wordprocessing2006), _defineProperty(_class$f, "LocalName", "pPr"), _temp$f));

	var _class$g, _temp$g;

	function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the text, element with tag "w:t"
	 */

	var Text$1 = OpenXmlElement.register((_temp$g = _class$g = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(Text, _Wordprocessing);

	  var _super = _createSuper$p(Text);

	  //#region override the key information
	  //#endregion
	  function Text(_node, _options) {
	    _classCallCheck(this, Text);

	    return _super.call(this, _node, _options);
	  }

	  _createClass(Text, null, [{
	    key: "createDetail",
	    value: function createDetail(_text, _options) {
	      _text.setAttribute("xml:space", "preserve");

	      _options && _options.text && (_text.textContent = _options.text);
	    }
	  }]);

	  return Text;
	}(Wordprocessing2006), _defineProperty(_class$g, "LocalName", "t"), _temp$g));

	var _class$h, _temp$h;

	function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the test run, element with tag "w:r"
	 */

	var Run$1 = OpenXmlElement.register((_temp$h = _class$h = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(Run, _Wordprocessing);

	  var _super = _createSuper$q(Run);

	  //#region override the key information
	  //#endregion
	  function Run(_node, _options) {
	    _classCallCheck(this, Run);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get all text in the element
	   */


	  _createClass(Run, [{
	    key: "textContent",
	    get: function get() {
	      var items = this.descendants(Text$1).map(function (text) {
	        return text.textContent;
	      });
	      return items.join("");
	    }
	  }]);

	  return Run;
	}(Wordprocessing2006), _defineProperty(_class$h, "LocalName", "r"), _temp$h));

	var _class$i, _temp$i;

	function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the paragraph, element with tag "w:p"
	 */

	var Paragraph$1 = OpenXmlElement.register((_temp$i = _class$i = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(Paragraph, _Wordprocessing);

	  var _super = _createSuper$r(Paragraph);

	  //#region override the key information
	  //#endregion
	  function Paragraph(_node, _options) {
	    _classCallCheck(this, Paragraph);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get all text in the element
	   */


	  _createClass(Paragraph, [{
	    key: "textContent",
	    get: function get() {
	      var items = this.descendants(Text$1).map(function (text) {
	        return text.textContent;
	      });
	      return items.join("");
	    }
	    /**
	     * get the properties
	     */

	  }, {
	    key: "styleProperties",
	    get: function get() {
	      var prop = this.childOne(StyleParagraphProperties);

	      if (!prop) {
	        prop = this.createElement(StyleParagraphProperties);
	        prop && this.insertChild(prop, 0);
	      }

	      return prop;
	    }
	  }]);

	  return Paragraph;
	}(Wordprocessing2006), _defineProperty(_class$i, "LocalName", "p"), _temp$i));

	var _class$j, _temp$j;

	function _createSuper$s(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$t(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$t() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the document's body, element with tag "body"
	 */

	var Body = OpenXmlElement.register((_temp$j = _class$j = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(Body, _Wordprocessing);

	  var _super = _createSuper$s(Body);

	  //#region override the key information
	  //#endregion
	  function Body(_node, _options) {
	    _classCallCheck(this, Body);

	    return _super.call(this, _node, _options);
	  }

	  return Body;
	}(Wordprocessing2006), _defineProperty(_class$j, "LocalName", "body"), _temp$j));

	var _class$k, _temp$k;

	function _createSuper$t(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$u(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$u() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the document, element with tag "document"
	 */

	var Document = OpenXmlElement.register((_temp$k = _class$k = /*#__PURE__*/function (_Wordprocessing) {
	  _inherits(Document, _Wordprocessing);

	  var _super = _createSuper$t(Document);

	  //#region override the key information
	  //#endregion
	  function Document(_node, _options) {
	    _classCallCheck(this, Document);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the body of the document
	   */


	  _createClass(Document, [{
	    key: "body",
	    get: function get() {
	      var element = this.childOne(Body);

	      if (!element) {
	        element = this.createElement(Body);
	        element && this.appendChild(element);
	      }

	      return element;
	    }
	  }]);

	  return Document;
	}(Wordprocessing2006), _defineProperty(_class$k, "LocalName", "document"), _temp$k));

	var index$3 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  AttrValue: AttrValue,
	  ParagraphStyleId: ParagraphStyleId,
	  StyleParagraphProperties: StyleParagraphProperties,
	  Text: Text$1,
	  Run: Run$1,
	  Paragraph: Paragraph$1,
	  Body: Body,
	  Document: Document,
	  namespaceURI: namespaceURI$3
	});

	var main$3 = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

	var namespaceURI$4 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  main: main$3
	});

	function _createSuper$u(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$v(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$v() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * basic class for elements defined in spreadsheet2006
	 */

	var Spreadsheet2006 = /*#__PURE__*/function (_OpenXmlElement) {
	  _inherits(Spreadsheet2006, _OpenXmlElement);

	  var _super = _createSuper$u(Spreadsheet2006);

	  //#region override the key information
	  //#endregion
	  function Spreadsheet2006(_node, _options) {
	    _classCallCheck(this, Spreadsheet2006);

	    return _super.call(this, _node, _options);
	  }

	  return Spreadsheet2006;
	}(OpenXmlElement);

	_defineProperty(Spreadsheet2006, "NamespaceUri", main$3);

	_defineProperty(Spreadsheet2006, "DefaultPrefix", "x");

	var _class$l, _temp$l, _class2$1, _temp2$1;

	function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper$v(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$w(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$w() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the sheet's id in sheet list, element with tag "sheet"
	 */

	var SheetId = OpenXmlElement.register((_temp$l = _class$l = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(SheetList, _Spreadsheet);

	  var _super = _createSuper$v(SheetList);

	  //#region override the key information
	  //#endregion
	  function SheetList(_node, _options) {
	    _classCallCheck(this, SheetList);

	    return _super.call(this, _node, _options);
	  }
	  /**
	   * get the id
	   */


	  _createClass(SheetList, [{
	    key: "id",
	    get: function get() {
	      return this.getAttribute("sheetId");
	    }
	    /**
	     * set the id
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute("sheetId", _val);
	    }
	    /**
	     * get the relationship ID
	     */

	  }, {
	    key: "relationshipId",
	    get: function get() {
	      var id = this.getAttribute(AttrRelationshipId);

	      if (!id) {
	        id = genRandId("R");
	        this.setAttribute(AttrRelationshipId, id);
	      }

	      return id;
	    }
	    /**
	     * set the relationship ID
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute(AttrRelationshipId, _val || utility.genRandId("R", 16));
	    }
	    /**
	     * get the name of the sheet
	     */

	  }, {
	    key: "name",
	    get: function get() {
	      return this.getAttribute("name");
	    }
	    /**
	     * set the name of the sheet
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute("name", _val);
	    }
	  }]);

	  return SheetList;
	}(Spreadsheet2006), _defineProperty(_class$l, "LocalName", "sheet"), _temp$l));
	/**
	 * class of the list of sheet, element with tag "sheets"
	 */

	var SheetList = OpenXmlElement.register((_temp2$1 = _class2$1 = /*#__PURE__*/function (_Spreadsheet2) {
	  _inherits(SheetList, _Spreadsheet2);

	  var _super2 = _createSuper$v(SheetList);

	  //#region override the key information
	  //#endregion
	  function SheetList(_node, _options) {
	    _classCallCheck(this, SheetList);

	    return _super2.call(this, _node, _options);
	  }
	  /**
	   * get a sheet id in the given position
	   * @param {Number} _pos the given position
	   * @return {SheetId}
	   */


	  _createClass(SheetList, [{
	    key: "getSheetId",
	    value: function getSheetId(_pos) {
	      var list = this.descendants(SheetId);
	      return _pos >= 0 && _pos < list.length && list[_pos];
	    }
	    /**
	     * get a sheet id with the given name
	     * @param {String} _name the name of the sheet
	     * @returns {SheetId}
	     */

	  }, {
	    key: "getSheetIdByName",
	    value: function getSheetIdByName(_name) {
	      var _iterator = _createForOfIteratorHelper$1(this.descendants(SheetId)),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var item = _step.value;

	          if (_name === item.name) {
	            return item;
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    }
	    /**
	     * get an iterator for enumerating all sheet's ids
	     */

	  }, {
	    key: "iterator",
	    value: /*#__PURE__*/regenerator.mark(function iterator() {
	      var _iterator2, _step2, item;

	      return regenerator.wrap(function iterator$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _iterator2 = _createForOfIteratorHelper$1(this.descendants(SheetId));
	              _context.prev = 1;

	              _iterator2.s();

	            case 3:
	              if ((_step2 = _iterator2.n()).done) {
	                _context.next = 9;
	                break;
	              }

	              item = _step2.value;
	              _context.next = 7;
	              return item;

	            case 7:
	              _context.next = 3;
	              break;

	            case 9:
	              _context.next = 14;
	              break;

	            case 11:
	              _context.prev = 11;
	              _context.t0 = _context["catch"](1);

	              _iterator2.e(_context.t0);

	            case 14:
	              _context.prev = 14;

	              _iterator2.f();

	              return _context.finish(14);

	            case 17:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, iterator, this, [[1, 11, 14, 17]]);
	    })
	    /**
	     * create a new id in this list
	     * @returns {SheetId}
	     */

	  }, {
	    key: "createId",
	    value: function createId() {
	      var id = this.createElement(SheetId);
	      id && this.appendChild(id);
	      return id;
	    }
	  }]);

	  return SheetList;
	}(Spreadsheet2006), _defineProperty(_class2$1, "LocalName", "sheets"), _temp2$1));

	var _class$m, _temp$m;

	function _createSuper$w(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$x(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$x() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the workbook, element with tag "workbook"
	 */

	var Workbook = OpenXmlElement.register((_temp$m = _class$m = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(Workbook, _Spreadsheet);

	  var _super = _createSuper$w(Workbook);

	  //#region override the key information
	  //#endregion
	  function Workbook(_node, _options) {
	    _classCallCheck(this, Workbook);

	    return _super.call(this, _node, _options);
	  }

	  _createClass(Workbook, [{
	    key: "sheetList",
	    get: function get() {
	      var list = this.childOne(SheetList);

	      if (!list) {
	        list = this.createElement(SheetList);
	        list && this.appendChild(list);
	      }

	      return list;
	    }
	  }]);

	  return Workbook;
	}(Spreadsheet2006), _defineProperty(_class$m, "LocalName", "workbook"), _temp$m));

	var _class$n, _temp$n, _class2$2, _temp2$2;

	function _createSuper$x(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$y(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$y() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the text for share string
	 * @private
	 */

	var ShareStringText = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(ShareStringText, _Spreadsheet);

	  var _super = _createSuper$x(ShareStringText);

	  //#region override the key information
	  //#endregion
	  function ShareStringText(_node, _options) {
	    _classCallCheck(this, ShareStringText);

	    return _super.call(this, _node, _options);
	  }

	  return ShareStringText;
	}(Spreadsheet2006);
	/**
	 * class of the share string item, element with tag "si"
	 */


	_defineProperty(ShareStringText, "LocalName", "t");

	var ShareStringItem = OpenXmlElement.register((_temp$n = _class$n = /*#__PURE__*/function (_Spreadsheet2) {
	  _inherits(ShareStringItem, _Spreadsheet2);

	  var _super2 = _createSuper$x(ShareStringItem);

	  //#region override the key information
	  //#endregion
	  function ShareStringItem(_node, _options) {
	    _classCallCheck(this, ShareStringItem);

	    return _super2.call(this, _node, _options);
	  }

	  _createClass(ShareStringItem, [{
	    key: "toString",
	    value: function toString() {
	      return this.text;
	    }
	  }, {
	    key: "text",
	    get: function get() {
	      var text = this.childOne(ShareStringText);
	      return text && text.textContent;
	    },
	    set: function set(_val) {
	      var text = this.childOne(ShareStringText);

	      if (!text) {
	        text = this.createElement(ShareStringText);
	        text && this.appendChild(text);
	      }

	      text && (text.textContent = _val);
	    }
	  }]);

	  return ShareStringItem;
	}(Spreadsheet2006), _defineProperty(_class$n, "LocalName", "si"), _temp$n));
	var $sst = Symbol("ShareStringStable.sst");
	/**
	 * class of the share string table, element with tag "sst"
	 */

	var ShareStringTable = OpenXmlElement.register((_temp2$2 = _class2$2 = /*#__PURE__*/function (_Spreadsheet3) {
	  _inherits(ShareStringTable, _Spreadsheet3);

	  var _super3 = _createSuper$x(ShareStringTable);

	  //#region override the key information
	  //#endregion
	  function ShareStringTable(_node, _options) {
	    var _this;

	    _classCallCheck(this, ShareStringTable);

	    _this = _super3.call(this, _node, _options);

	    _this.reload();

	    return _this;
	  }
	  /**
	   * get all items of the share strings
	   */


	  _createClass(ShareStringTable, [{
	    key: "add",

	    /**
	     * add a new share string item
	     * if there is already a string with the same value, this function will return the old one instead of insert a new one
	     * @param {String} _text the value of the string
	     * @return {Number} the index of the string
	     */
	    value: function add(_text) {
	      // return if there is already a string with the same value
	      _text = String(_text);
	      var items = this.items();

	      for (var index in items) {
	        var _item = items[index];

	        if (String(_item) === _text) {
	          return index;
	        }
	      } // create a new string if the value is not in the table yet


	      var item = this.createElement(ShareStringItem);

	      if (item) {
	        item.text = _text;
	        this.appendChild(item);
	        this[$sst].push(item);
	        return this[$sst].length - 1;
	      }
	    }
	    /**
	     * reload all the share strings
	     */

	  }, {
	    key: "reload",
	    value: function reload() {
	      this[$sst] = this.children(ShareStringItem);
	    }
	  }, {
	    key: "items",
	    get: function get() {
	      if (0 >= this[$sst].length) {
	        this[$sst] = this.children(ShareStringItem);
	      }

	      return this[$sst];
	    }
	  }]);

	  return ShareStringTable;
	}(Spreadsheet2006), _defineProperty(_class2$2, "LocalName", "sst"), _temp2$2));

	var _class$o, _temp$o, _class2$3, _temp2$3;

	function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

	function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper$y(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$z(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$z() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of column information, element with tag "col"
	 */

	var ColumnInformation = OpenXmlElement.register((_temp$o = _class$o = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(ColumnInformation, _Spreadsheet);

	  var _super = _createSuper$y(ColumnInformation);

	  function ColumnInformation() {
	    _classCallCheck(this, ColumnInformation);

	    return _super.apply(this, arguments);
	  }

	  _createClass(ColumnInformation, [{
	    key: "width",
	    //#region override the key information
	    //#endregion

	    /**
	     * get the width information
	     */
	    get: function get() {
	      var customWidth = this.getAttribute("customWidth");
	      return customWidth && Number(this.getAttribute("width"));
	    }
	    /**
	     * set the width information
	     * set as undefined will clear the setting
	     */
	    ,
	    set: function set(_val) {
	      if (typeof _val === "number") {
	        this.setAttribute("width", _val);
	        this.setAttribute("customWidth", 1);
	      } else if (_val === undefined || _val === null) {
	        this.removeAttribute("width");
	        this.removeAttribute("customWidth");
	      }
	    }
	    /**
	     * get the max index of column affected by this information 
	     */

	  }, {
	    key: "maxIndex",
	    get: function get() {
	      return Number(this.getAttribute("max"));
	    }
	    /**
	     * set the max index of the column affected by this information 
	     */
	    ,
	    set: function set(_val) {
	      typeof _val === "number" && this.setAttribute("max", _val);
	    }
	    /**
	     * get the min index of column affected by this information 
	     */

	  }, {
	    key: "minIndex",
	    get: function get() {
	      return Number(this.getAttribute("min"));
	    }
	    /**
	     * set the min index of the column affected by this information 
	     */
	    ,
	    set: function set(_val) {
	      typeof _val === "number" && this.setAttribute("min", _val);
	    }
	    /**
	     * get the index range of columns affected by this information
	     */

	  }, {
	    key: "index",
	    get: function get() {
	      return [this.minIndex, this.maxIndex];
	    }
	    /**
	     * set the index of colum affected by this information 
	     * this function will set the maxIndex ans minIndex with a same value
	     */
	    ,
	    set: function set(_val) {
	      typeof _val === "number" && (this.maxIndex = _val, this.minIndex = _val);
	    }
	  }]);

	  return ColumnInformation;
	}(Spreadsheet2006), _defineProperty(_class$o, "LocalName", "col"), _temp$o));
	/**
	 * class of the set of column information, element with tag "cols"
	 */

	var ColumnInformationSet = OpenXmlElement.register((_temp2$3 = _class2$3 = /*#__PURE__*/function (_Spreadsheet2) {
	  _inherits(ColumnInformationSet, _Spreadsheet2);

	  var _super2 = _createSuper$y(ColumnInformationSet);

	  function ColumnInformationSet() {
	    _classCallCheck(this, ColumnInformationSet);

	    return _super2.apply(this, arguments);
	  }

	  _createClass(ColumnInformationSet, [{
	    key: "getInforamtion",

	    /**
	     * get the informations of the column index by the given number
	     * @param {Number} _index the index of the column
	     * @return {ColumnInformation} the information object, return undefined if the information is net set.
	     */
	    value: function getInforamtion(_index) {
	      var _iterator = _createForOfIteratorHelper$2(this.items),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var item = _step.value;

	          if (_index >= item.minIndex && _index <= item.maxIndex) {
	            return item;
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    }
	    /**
	     * get the informations of the column index by the given number.
	     * different from getInformation, this function will create a new information object if the information had been not set.
	     * @param {Number} _index the index of the column
	     * @return {ColumnInformation} the information object
	     */

	  }, {
	    key: "acquireInformation",
	    value: function acquireInformation(_index) {
	      var info = this.getInforamtion(_index);

	      if (!info) {
	        info = this.createElement(ColumnInformation);
	        info && (this.appendChild(info), info.index = _index);
	      }

	      return info;
	    }
	  }, {
	    key: "items",
	    //#region override the key information
	    //#endregion

	    /**
	     * get all informations
	     */
	    get: function get() {
	      return this.children(ColumnInformation);
	    }
	  }]);

	  return ColumnInformationSet;
	}(Spreadsheet2006), _defineProperty(_class2$3, "LocalName", "cols"), _temp2$3));

	/**
	 * convert the id of the column to the index of the column.
	 * for example: "A" is converted to 1, "BA" is converted to 53
	 * @param {String} _id the id of the column
	 * @returns {Number} the index of the column
	 */
	function columnIdToIndex(_id) {
	  var index = 0;
	  _id = String(_id).toUpperCase();

	  for (var pos in _id) {
	    var item = _id.charCodeAt(pos) - 64;
	    index = index * 26 + item;
	  }

	  return index;
	}
	/**
	 * convert the index of the column to the id of the column.
	 * @param {Number} _index the index of the column
	 * @returns {String} the id of the column
	 */

	function columnIndexToId(_index) {
	  _index = Number(_index);

	  if (!isNaN(_index)) {
	    var id = "";

	    for (; _index > 0; _index = parseInt(_index / 26)) {
	      var mod = --_index % 26;
	      id = String.fromCharCode(65 + mod) + id;
	    }

	    return id;
	  }
	}
	/**
	 * check if the reference id is in correct format
	 * @param {String} _id the reference id
	 * @returns {Boolean}
	 */

	function isValidReferenceId(_id) {
	  return /^[A-Z]+\d+$/.test(_id);
	}
	/**
	 * decompose the reference id of the cell to column's id and row's index
	 * @param {String} _id the reference id of the cell
	 * @returns {Object} { colId: <the id of the column>, rowIndex: <the index of the row> }
	 */

	function decomposeReferenceId(_id) {
	  var matched = /^([A-Z]+)(\d+)$/.exec(_id);
	  return matched ? {
	    colId: matched[1],
	    rowIndex: Number(matched[2])
	  } : {};
	}

	var toolkit = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  columnIdToIndex: columnIdToIndex,
	  columnIndexToId: columnIndexToId,
	  isValidReferenceId: isValidReferenceId,
	  decomposeReferenceId: decomposeReferenceId
	});

	var _class$p, _temp$p, _class2$4, _temp2$4, _class3$1, _temp3$1, _class4$1, _temp4$1, _class5, _temp5;

	function _createSuper$z(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$A(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$A() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var assert$4 = assert;
	/**
	 * declared type of the data for value of cell
	 */

	var DataType = Object.freeze({
	  Boolean: "b",
	  Number: "n",
	  Error: "e",
	  SharedString: "s",
	  String: "str",
	  InlineString: "inlineStr",
	  Date: "d"
	});
	/**
	 * class of the value of the cell, element with tag "v"
	 */

	var CellValue = OpenXmlElement.register((_temp$p = _class$p = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(CellValue, _Spreadsheet);

	  var _super = _createSuper$z(CellValue);

	  function CellValue() {
	    _classCallCheck(this, CellValue);

	    return _super.apply(this, arguments);
	  }

	  return CellValue;
	}(Spreadsheet2006), _defineProperty(_class$p, "LocalName", "v"), _temp$p));
	/**
	 * class of the formula of the cell, element with tag "v"
	 */

	var CellFormula = OpenXmlElement.register((_temp2$4 = _class2$4 = /*#__PURE__*/function (_Spreadsheet2) {
	  _inherits(CellFormula, _Spreadsheet2);

	  var _super2 = _createSuper$z(CellFormula);

	  function CellFormula() {
	    _classCallCheck(this, CellFormula);

	    return _super2.apply(this, arguments);
	  }

	  return CellFormula;
	}(Spreadsheet2006), _defineProperty(_class2$4, "LocalName", "f"), _temp2$4));
	/**
	 * class of the cell of the sheet, element with tag "c"
	 */

	var Cell = OpenXmlElement.register((_temp3$1 = _class3$1 = /*#__PURE__*/function (_Spreadsheet3) {
	  _inherits(Cell, _Spreadsheet3);

	  var _super3 = _createSuper$z(Cell);

	  function Cell() {
	    _classCallCheck(this, Cell);

	    return _super3.apply(this, arguments);
	  }

	  _createClass(Cell, [{
	    key: "styleIndex",
	    //#region override the key information
	    //#endregion

	    /**
	     * get the index of the style
	     */
	    get: function get() {
	      return Number(this.getAttribute("s"));
	    }
	    /**
	     * set the index of the style
	     */
	    ,
	    set: function set(_val) {
	      if (typeof _val === "number") {
	        this.setAttribute("s", _val);
	      } else if (_val === undefined || _val === null) {
	        this.removeAttribute("s");
	      }
	    }
	    /**
	     * get the reference name of the cell
	     */

	  }, {
	    key: "referenceId",
	    get: function get() {
	      return this.getAttribute("r");
	    }
	    /**
	     * set the reference name of the cell
	     */
	    ,
	    set: function set(_val) {
	      _val && this.setAttribute("r", _val);
	    }
	    /**
	     * get the type of the data
	     */

	  }, {
	    key: "dataType",
	    get: function get() {
	      return this.getAttribute("t");
	    }
	    /**
	     * set the type of the data
	     */
	    ,
	    set: function set(_val) {
	      this.setAttribute("t", _val);
	    }
	    /**
	     * get the value of the cell
	     */

	  }, {
	    key: "value",
	    get: function get() {
	      var val = this.childOne(CellValue);
	      return val && val.textContent;
	    }
	    /**
	     * set the value of the cell
	     */
	    ,
	    set: function set(_val) {
	      var element = this.childOne(CellValue);

	      if (!element) {
	        element = this.createElement(CellValue);
	        element && this.appendChild(element);
	      }

	      element && (element.textContent = _val);
	    }
	    /**
	     * get the formula of the cell
	     */

	  }, {
	    key: "formula",
	    get: function get() {
	      var val = this.childOne(CellFormula);
	      return val && val.textContent;
	    }
	    /**
	     * set the formula of the cell
	     */
	    ,
	    set: function set(_val) {
	      var element = this.childOne(CellFormula);

	      if (!element) {
	        element = this.createElement(CellFormula);
	        element && this.appendChild(element);
	      }

	      element && (element = _val);
	    }
	  }]);

	  return Cell;
	}(Spreadsheet2006), _defineProperty(_class3$1, "LocalName", "c"), _temp3$1));
	/**
	 * class of the Row of the sheet, element with tag "row"
	 */

	var Row = OpenXmlElement.register((_temp4$1 = _class4$1 = /*#__PURE__*/function (_Spreadsheet4) {
	  _inherits(Row, _Spreadsheet4);

	  var _super4 = _createSuper$z(Row);

	  function Row() {
	    _classCallCheck(this, Row);

	    return _super4.apply(this, arguments);
	  }

	  _createClass(Row, [{
	    key: "acquireCell",

	    /**
	     * acquire a cell with a special reference id.
	     * this function will create a new object if the cell had not been set yet
	     * @param {String} _colRefenceId the reference id of the column
	     * @return {Cell} the instance of the target cell
	     */
	    value: function acquireCell(_colRefenceId) {
	      _colRefenceId = String(_colRefenceId).toUpperCase();
	      var cell = this.childOne(Cell.xpath("and @r='".concat(_colRefenceId).concat(this.referenceIndex, "'")));

	      if (!cell) {
	        cell = this.createElement(Cell);
	        cell && (this.appendChild(cell), cell.referenceId = "".concat(_colRefenceId).concat(this.referenceIndex));
	      }

	      return cell;
	    }
	    /**
	     * get a cell with a special reference id.
	     * @param {String} _colRefenceId the reference id of the column
	     * @return {Cell} the instance of the target cell
	     */

	  }, {
	    key: "getCell",
	    value: function getCell(_colRefenceId) {
	      _colRefenceId = String(_colRefenceId).toUpperCase();
	      return this.childOne(Cell.xpath("and @r='".concat(_colRefenceId).concat(this.referenceIndex, "'")));
	    }
	  }, {
	    key: "height",
	    //#region override the key information
	    //#endregion

	    /**
	     * get the height of the row
	     */
	    get: function get() {
	      var custom = this.getAttribute("customHeight");
	      return custom && Number(this.getAttribute("ht"));
	    }
	    /**
	     * set the height of the row.
	     * set as undefined will clear the setting
	     */
	    ,
	    set: function set(_val) {
	      if (typeof _val === "number") {
	        this.setAttribute("ht", _val);
	        this.setAttribute("customHeight", 1);
	      } else if (_val === undefined || _val === null) {
	        this.removeAttribute("ht");
	        this.removeAttribute("customHeight");
	      }
	    }
	    /**
	     * get the reference index of the row
	     */

	  }, {
	    key: "referenceIndex",
	    get: function get() {
	      return Number(this.getAttribute("r"));
	    }
	    /**
	     * set the reference index of the row
	     */
	    ,
	    set: function set(_val) {
	      typeof _val === "number" && this.setAttribute("r", _val);
	    }
	    /**
	     * get all cells in this row
	     */

	  }, {
	    key: "cells",
	    get: function get() {
	      return this.children(Cell);
	    }
	  }]);

	  return Row;
	}(Spreadsheet2006), _defineProperty(_class4$1, "LocalName", "row"), _temp4$1));
	/**
	 * class of the data of the sheet, element with tag "sheetData"
	 */

	var SheetData = OpenXmlElement.register((_temp5 = _class5 = /*#__PURE__*/function (_Spreadsheet5) {
	  _inherits(SheetData, _Spreadsheet5);

	  var _super5 = _createSuper$z(SheetData);

	  function SheetData() {
	    _classCallCheck(this, SheetData);

	    return _super5.apply(this, arguments);
	  }

	  _createClass(SheetData, [{
	    key: "acquireRow",

	    /**
	     * acquire a row with a special reference index.
	     * this function will create a new object if the row had not been set yet
	     * @param {Number} _index the reference index
	     * @return {Row} the instance of the target row
	     */
	    value: function acquireRow(_index) {
	      _index = Number(_index);

	      if (!isNaN(_index) && _index > 0) {
	        var row = this.childOne(Row.xpath("and @r='".concat(_index, "'")));

	        if (!row) {
	          row = this.createElement(Row);
	          row && (this.appendChild(row), row.referenceIndex = _index);
	        }

	        return row;
	      }
	    }
	    /**
	     * get a row with a special reference index
	     * @param {Number} _index the reference index
	     * @return {Row} the instance of the target row
	     */

	  }, {
	    key: "getRow",
	    value: function getRow(_index) {
	      _index = Number(_index);
	      return !isNaN(_index) && _index > 0 && this.childOne(Row.xpath("and @r='".concat(_index, "'")));
	    }
	    /**
	     * acquire a cell with a special reference id.
	     * this function will create a new object if the cell had not been set yet
	     * @param {String} _refenceId the reference id
	     * @return {Cell} the instance of the target cell
	     */

	  }, {
	    key: "acquireCell",
	    value: function acquireCell(_refenceId) {
	      _refenceId = String(_refenceId).toUpperCase();
	      var cell = this.descendantOne(Cell.xpath("and @r='".concat(_refenceId, "'")));

	      if (!cell) {
	        var rowIndex = Number(String(_refenceId).replace(/[^\d]/, ""));

	        if (!isNaN(rowIndex)) {
	          var row = this.childOne(Row.xpath("and @r='".concat(rowIndex, "'")));

	          if (!row) {
	            row = this.createElement(Row);
	            row && (this.appendChild(row), row.referenceIndex = rowIndex);
	          }

	          if (row) {
	            cell = row.createElement(Cell);
	            cell && (row.appendChild(cell), cell.referenceId = _refenceId);
	          }
	        }
	      }

	      return cell;
	    }
	    /**
	     * get a cell with a special reference id.
	     * @param {String} _refenceId the reference id
	     * @return {Cell} the instance of the target cell
	     */

	  }, {
	    key: "getCell",
	    value: function getCell(_refenceId) {
	      _refenceId = String(_refenceId).toUpperCase();
	      return this.descendantOne(Cell.xpath("and @r='".concat(_refenceId, "'")));
	    }
	    /**
	     * fill a range with the data of a table
	     * @param {String} _startReferenceId the reference id of the start cell
	     * @param {Array|Object} _table the data of a table
	     */

	  }, {
	    key: "fillRangeWithTable",
	    value: function fillRangeWithTable(_startReferenceId, _table) {
	      assert$4(_table, EXPECT_PARAM("_table"));

	      var _toolkit$decomposeRef = decomposeReferenceId(_startReferenceId),
	          colId = _toolkit$decomposeRef.colId,
	          rowIndex = _toolkit$decomposeRef.rowIndex;

	      assert$4(colId && rowIndex !== undefined, EXPECT_PARAM("_startReferenceId in correct format"));
	      var startColIndex = columnIdToIndex(colId);

	      for (var rowPos in _table) {
	        var rowData = assert$4(_table[rowPos], ACQUIRE_RESOURCE_FAIL("row data of _table[".concat(rowPos, "]")));
	        var row = assert$4(this.acquireRow(rowIndex++), ACQUIRE_RESOURCE_FAIL("row element in sheetData for _table[".concat(rowPos, "]")));
	        var colIndex = startColIndex;

	        for (var cellPos in rowData) {
	          var cellData = rowData[cellPos];
	          var cell = assert$4(row.acquireCell(columnIndexToId(colIndex++)), ACQUIRE_RESOURCE_FAIL("cell element in sheetData for _table[".concat(rowPos, "][").concat(cellPos, "]")));
	          cell.value = cellData;
	          cell.dataType = isNaN(Number(cellData)) ? DataType.String : DataType.Number;
	        }
	      }
	    }
	    /**
	     * get a range of data if the SheetData and fill into a table
	     * @param {String} _startReferenceId the reference id of the start cell
	     * @param {Number} _rowCount the count of the rows
	     * @param {Number} _colCount the count of the column
	     * @param {ShareStringTable} _shareStringTable  the table of the share string of the workbook, 
	     *                                              function will not translate the share string if this parameter is ignored
	     * @returns {Array<Array>}
	     */

	  }, {
	    key: "getRangeToTable",
	    value: function getRangeToTable(_startReferenceId, _rowCount, _colCount, _shareStringTable) {
	      assert$4(_rowCount > 0 && _colCount > 0, EXPECT_PARAM("_rowCount and _colCount"));

	      var _toolkit$decomposeRef2 = decomposeReferenceId(_startReferenceId),
	          colId = _toolkit$decomposeRef2.colId,
	          rowIndex = _toolkit$decomposeRef2.rowIndex;

	      assert$4(colId && rowIndex !== undefined, EXPECT_PARAM("_startReferenceId in correct format"));
	      var startColIndex = columnIdToIndex(colId);
	      var maxRowIndex = rowIndex + _rowCount;
	      var maxColIndex = startColIndex + _colCount;
	      var table = [];

	      for (; rowIndex < maxRowIndex; rowIndex++) {
	        var row = this.getRow(rowIndex);
	        var rowData = [];

	        if (row) {
	          for (var colIndex = startColIndex; colIndex < maxColIndex; colIndex++) {
	            var cellData = undefined;
	            var cell = row.getCell(columnIndexToId(colIndex));

	            if (cell) {
	              cellData = cell.value;

	              if (DataType.SharedString === cell.dataType && _shareStringTable) {
	                cellData = _shareStringTable.items[cellData];
	              }
	            }

	            rowData.push(cellData);
	          }
	        }

	        table.push(rowData);
	      }

	      return table;
	    }
	  }, {
	    key: "rows",
	    //#region override the key information
	    //#endregion

	    /**
	     * get all rows in the sheet
	     */
	    get: function get() {
	      return this.children(Row);
	    }
	  }]);

	  return SheetData;
	}(Spreadsheet2006), _defineProperty(_class5, "LocalName", "sheetData"), _temp5));

	var _class$q, _temp$q;

	function _createSuper$A(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$B(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$B() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the worksheet, element with tag "worksheet"
	 */

	var WorkSheet = OpenXmlElement.register((_temp$q = _class$q = /*#__PURE__*/function (_Spreadsheet) {
	  _inherits(WorkSheet, _Spreadsheet);

	  var _super = _createSuper$A(WorkSheet);

	  function WorkSheet() {
	    _classCallCheck(this, WorkSheet);

	    return _super.apply(this, arguments);
	  }

	  return WorkSheet;
	}(Spreadsheet2006), _defineProperty(_class$q, "LocalName", "worksheet"), _temp$q));

	var index$4 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  Workbook: Workbook,
	  SheetId: SheetId,
	  SheetList: SheetList,
	  ShareStringItem: ShareStringItem,
	  ShareStringTable: ShareStringTable,
	  ColumnInformation: ColumnInformation,
	  ColumnInformationSet: ColumnInformationSet,
	  DataType: DataType,
	  CellValue: CellValue,
	  CellFormula: CellFormula,
	  Cell: Cell,
	  Row: Row,
	  SheetData: SheetData,
	  WorkSheet: WorkSheet,
	  namespaceURI: namespaceURI$4,
	  toolkit: toolkit
	});

	var index$5 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  office: index,
	  presentation: index$2,
	  drawing: index$1,
	  wordprocessing: index$3,
	  spreadsheet: index$4
	});

	var _class$r, _temp$r;

	function _createSuper$B(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$C(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$C() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

	function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	var assert$5 = assert; //#region inner class
	//#region class of SlideSet

	var $slideAvalidID = Symbol("SlideSet.avalidID");
	/**
	 * Class of operating the set of the slides
	 */

	var SlideSet = /*#__PURE__*/function () {
	  /**
	   * the minimum ID
	   */

	  /**
	   * the maximum ID
	   */

	  /**
	   * constructor
	   * @param {Presentation} _presentation the presentation part
	   */
	  function SlideSet(_parent) {
	    _classCallCheck(this, SlideSet);

	    assert$5(_parent instanceof PresentationPart, "_parent(an instance of PresentationPart)");
	    readonly(this, "selfElement", _parent.presentation.slideIdList);
	    readonly(this, "parent", _parent);
	    this.arrangeId();
	  }
	  /**
	   * arrange the id of all slides
	   * the new set of id will start from MIN_ID
	   */


	  _createClass(SlideSet, [{
	    key: "arrangeId",
	    value: function arrangeId() {
	      var rootNode = this.parent.contentDom.documentElement;
	      var id = SlideSet.MIN_ID;

	      var _iterator = _createForOfIteratorHelper$3(this.selfElement.items()),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var slideId = _step.value.slideId;
	          var oriId = slideId.id;
	          var relElements = rootNode.xpathSelect(".//*[local-name(.)='sldId' and @id='".concat(oriId, "']"));

	          for (var relIdx in relElements) {
	            relElements[relIdx].setAttribute("id", id);
	          }

	          id++;
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      this[$slideAvalidID] = id;
	    }
	    /**
	     * the count of the slides
	     */

	  }, {
	    key: "getByIndex",

	    /**
	     * get a slide by the index in the slide set
	     * @param {Number} _index the index of the slide in the slide set
	     */
	    value: function getByIndex(_index) {
	      var sldIdNode = this.selfElement.children(SlideId)[_index];

	      if (sldIdNode) {
	        return this.parent.getRelationPart(sldIdNode.relationshipId);
	      }
	    }
	    /**
	     * get an iterator of all slides
	     */

	  }, {
	    key: "slides",
	    value: /*#__PURE__*/regenerator.mark(function slides() {
	      var parent, _iterator2, _step2, _step2$value, index, slideId;

	      return regenerator.wrap(function slides$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              parent = this.parent;
	              _iterator2 = _createForOfIteratorHelper$3(this.selfElement.items());
	              _context.prev = 2;

	              _iterator2.s();

	            case 4:
	              if ((_step2 = _iterator2.n()).done) {
	                _context.next = 10;
	                break;
	              }

	              _step2$value = _step2.value, index = _step2$value.index, slideId = _step2$value.slideId;
	              _context.next = 8;
	              return {
	                index: index,
	                getter: parent.getRelationPart(slideId.relationshipId),
	                id: slideId.id
	              };

	            case 8:
	              _context.next = 4;
	              break;

	            case 10:
	              _context.next = 15;
	              break;

	            case 12:
	              _context.prev = 12;
	              _context.t0 = _context["catch"](2);

	              _iterator2.e(_context.t0);

	            case 15:
	              _context.prev = 15;

	              _iterator2.f();

	              return _context.finish(15);

	            case 18:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, slides, this, [[2, 12, 15, 18]]);
	    })
	    /**
	     * enumerate each slide and pass to the callback function to process
	     * @param {Function} _cb the callback function
	     */

	  }, {
	    key: "each",
	    value: function () {
	      var _each = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_cb) {
	        var parent, _iterator3, _step3, _step3$value, index, slideId, slidePart, cbRet;

	        return regenerator.wrap(function _callee$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!(typeof _cb === "function")) {
	                  _context2.next = 25;
	                  break;
	                }

	                parent = this.parent;
	                _iterator3 = _createForOfIteratorHelper$3(this.selfElement.items());
	                _context2.prev = 3;

	                _iterator3.s();

	              case 5:
	                if ((_step3 = _iterator3.n()).done) {
	                  _context2.next = 17;
	                  break;
	                }

	                _step3$value = _step3.value, index = _step3$value.index, slideId = _step3$value.slideId;
	                _context2.next = 9;
	                return parent.getRelationPart(slideId.relationshipId);

	              case 9:
	                slidePart = _context2.sent;
	                cbRet = _cb(index, slidePart);
	                _context2.t0 = cbRet instanceof Promise;

	                if (!_context2.t0) {
	                  _context2.next = 15;
	                  break;
	                }

	                _context2.next = 15;
	                return cbRet;

	              case 15:
	                _context2.next = 5;
	                break;

	              case 17:
	                _context2.next = 22;
	                break;

	              case 19:
	                _context2.prev = 19;
	                _context2.t1 = _context2["catch"](3);

	                _iterator3.e(_context2.t1);

	              case 22:
	                _context2.prev = 22;

	                _iterator3.f();

	                return _context2.finish(22);

	              case 25:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee, this, [[3, 19, 22, 25]]);
	      }));

	      function each(_x) {
	        return _each.apply(this, arguments);
	      }

	      return each;
	    }()
	    /**
	     * insert a slide
	     * @param {*} _positionSlide    表示插入位置的胶片，新胶片将插入到此胶片之后，可以是胶片顺序号、胶片关系ID、胶片部件
	     *                              如果输入的是undefined，则将新胶片添加到最后
	     *                              如果输入的是-1，则表示将新胶片添加到第一张
	     * @param {*} _targetSlide      新胶片的部件，如果不输入该参数，则复制_positionSlide表示的胶片为新胶片
	     */

	  }, {
	    key: "insert",
	    value: function () {
	      var _insert = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_positionSlide, _targetSlide) {
	        var parent, useId, relSlideId, slideIdSet, refSlidePart, fileExtName, fileName, filePath, rid, newId;
	        return regenerator.wrap(function _callee2$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                parent = this.parent; // get a valid id for new slide.
	                // if there is no valid id, try once after arranging.

	                useId = this[$slideAvalidID];

	                if (useId > SlideSet.MAX_ID) {
	                  this.arrangeId();
	                  useId = this[$slideAvalidID];
	                }

	                assert$5(useId <= SlideSet.MAX_ID, NO_ENOUGH_ID); // check the new slide must be in the same package of the slide set

	                assert$5(!_targetSlide || parent.inSamePackage(_targetSlide), FROM_OTHER_PACKAGE("_targetSlide")); // looking for the relationship ID of the position slide

	                relSlideId = undefined;

	                if (typeof _positionSlide === "number") {
	                  slideIdSet = this.selfElement.children(SlideId);
	                  relSlideId = slideIdSet[_positionSlide < 0 ? 0 : _positionSlide >= slideIdSet.length ? slideIdSet.length - 1 : _positionSlide];
	                } else if (typeof _positionSlide === "string") {
	                  relSlideId = this.selfElement.childOne(AttrRelationshipId, "and string(.)='".concat(_positionSlide, "'"));
	                } else if (parent.inSamePackage(_positionSlide)) {
	                  relSlideId = this.selfElement.childOne(AttrRelationshipId, "and string(.)='".concat(_positionSlide.relationID, "'"));
	                }

	                if (_targetSlide) {
	                  _context3.next = 21;
	                  break;
	                }

	                if (!relSlideId) {
	                  _context3.next = 20;
	                  break;
	                }

	                _context3.next = 11;
	                return parent.getRelationPart(relSlideId.relationshipId);

	              case 11:
	                refSlidePart = _context3.sent;
	                fileExtName = path__default['default'].extname(refSlidePart.path);
	                fileName = path__default['default'].basename(refSlidePart.path, fileExtName).replace(/\d$/, "") + genRandId$1() + fileExtName;
	                filePath = path__default['default'].dirname(refSlidePart.path);
	                _context3.next = 17;
	                return refSlidePart.duplicate(path__default['default'].join(filePath, fileName));

	              case 17:
	                _targetSlide = _context3.sent;
	                _context3.next = 21;
	                break;

	              case 20:
	                throw NO_IMPLEMENT();

	              case 21:
	                assert$5(_targetSlide, LOCATE_RESOURCE_FAIL("target slide part")); // insert the target slide

	                rid = parent.insertRelationPart(_targetSlide);
	                newId = this.selfElement.createElement(SlideId);
	                assert$5(newId, ACQUIRE_RESOURCE_FAIL("SlideId Node"));
	                newId.id = useId;
	                newId.relationshipId = rid;
	                relSlideId ? relSlideId.insertAsSibling(newId, typeof _positionSlide === "number" && _positionSlide < 0) : this.selfElement.appendChild(newId);
	                this[$slideAvalidID]++;
	                parent.commit();
	                return _context3.abrupt("return", rid);

	              case 31:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function insert(_x2, _x3) {
	        return _insert.apply(this, arguments);
	      }

	      return insert;
	    }()
	  }, {
	    key: "count",
	    get: function get() {
	      return this.selfElement.count;
	    }
	  }]);

	  return SlideSet;
	}(); //#endregion
	//#endregion

	/**
	 * Class of operating the presentation part
	 * @class PresentationPart
	 */


	_defineProperty(SlideSet, "MIN_ID", 256);

	_defineProperty(SlideSet, "MAX_ID", 0x0ffffffff);

	var PresentationPart = OpenXmlPart.register((_temp$r = _class$r = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(PresentationPart, _OpenXmlPurePart);

	  var _super = _createSuper$B(PresentationPart);

	  //#region override the shemas infomation and so on
	  //#endregion

	  /**
	   * constructor
	   * @param {*} _opt 
	   */
	  function PresentationPart(_opt) {
	    var _this;

	    _classCallCheck(this, PresentationPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), "presentation", _this.primaryElement);
	    readonly(_assertThisInitialized(_this), "slideSet", new SlideSet(_assertThisInitialized(_this)));
	    return _this;
	  }

	  return PresentationPart;
	}(OpenXmlPurePart), _defineProperty(_class$r, "SchemasURI", "http://schemas.openxmlformats.org/presentationml/2006/main"), _defineProperty(_class$r, "ContentType", "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"), _temp$r));

	var _class$s, _temp$s;

	function _createSuper$C(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$D(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$D() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/**
	 * class of the slide part
	 * @class SlidePart
	 */

	var SlidePart = OpenXmlPart.register((_temp$s = _class$s = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(SlidePart, _OpenXmlPurePart);

	  var _super = _createSuper$C(SlidePart);

	  //#region override the key information
	  //#endregion

	  /**
	   * constructor
	   * @param {*} _opt 
	   */
	  function SlidePart(_opt) {
	    var _this;

	    _classCallCheck(this, SlidePart);

	    _this = _super.call(this, _opt);
	    var slideElement = _this.primaryElement;

	    if (!(slideElement instanceof Slide)) {
	      slideElement = Slide.createElement(_this.dom);
	      slideElement && _this.dom.appendChild(slideElement.node);
	    }

	    readonly(_assertThisInitialized(_this), "slide", slideElement);
	    return _this;
	  }

	  return SlidePart;
	}(OpenXmlPurePart), _defineProperty(_class$s, "SchemasURI", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"), _defineProperty(_class$s, "ContentType", "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"), _temp$s));

	var index$6 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  PresentationPart: PresentationPart,
	  SlidePart: SlidePart
	});

	var _class$t, _temp$t;

	function _createSuper$D(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$E(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$E() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	/**
	 * Class of operating the document part
	 * @class DocumentPart
	 */

	var DocumentPart = OpenXmlPart.register((_temp$t = _class$t = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(DocumentPart, _OpenXmlPurePart);

	  var _super = _createSuper$D(DocumentPart);

	  //#region override the shemas infomation and so on
	  //#endregion

	  /**
	   * constructor
	   * @param {*} _opt 
	   */
	  function DocumentPart(_opt) {
	    var _this;

	    _classCallCheck(this, DocumentPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), "document", _this.primaryElement);
	    return _this;
	  }

	  return DocumentPart;
	}(OpenXmlPurePart), _defineProperty(_class$t, "SchemasURI", "http://schemas.openxmlformats.org/wordprocessingml/2006/main"), _defineProperty(_class$t, "ContentType", "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"), _defineProperty(_class$t, "DefaultPath", "word/document.xml"), _temp$t));

	var index$7 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  DocumentPart: DocumentPart
	});

	var _class$u, _temp$u;

	function _createSuper$E(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$F(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$F() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var assert$6 = assert;
	var EMPTY_SHARESTRING_DOC_XML = '<?xml version="1.0" encoding="UTF-8" standalone="true"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"></sst>'; //#endregion

	/**
	 * Class of operating the share string part
	 * @class ShareStringPart
	 */

	var ShareStringPart = OpenXmlPart.register((_temp$u = _class$u = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(ShareStringPart, _OpenXmlPurePart);

	  var _super = _createSuper$E(ShareStringPart);

	  _createClass(ShareStringPart, null, [{
	    key: "create",
	    //#region override the shemas infomation and so on
	    //#endregion

	    /**
	     * override for creating a new share string part
	     * @param {OpenXmlPackage} _package the package store the new part
	     * @param {String} _path the path of the share string part
	     * @return {Promise<ShareStringPart>} the new part
	     */
	    value: function create(_package, _path) {
	      assert$6(OpenXmlPackage$1.isPackage(_package), EXPECT_PARAM("_package must be an instance of OpenXmlPackage"));
	      assert$6(_path, EXPECT_PARAM("_path"));

	      _package.setFile(_path, EMPTY_SHARESTRING_DOC_XML, this.ContentFormat);

	      return this.load(_package, _path);
	    }
	    /**
	     * constructor
	     * @param {*} _opt 
	     */

	  }]);

	  function ShareStringPart(_opt) {
	    var _this;

	    _classCallCheck(this, ShareStringPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), "table", _this.primaryElement);
	    return _this;
	  }

	  _createClass(ShareStringPart, [{
	    key: "add",
	    value: function add(_text) {
	      return this.table.add(_text);
	    }
	  }, {
	    key: "items",
	    get: function get() {
	      return this.table.items;
	    }
	  }]);

	  return ShareStringPart;
	}(OpenXmlPurePart), _defineProperty(_class$u, "SchemasURI", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"), _defineProperty(_class$u, "ContentType", "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"), _temp$u));

	var _class$v, _temp$v;

	function _createSuper$F(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$G(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$G() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	/**
	 * Class of operating the workbook part
	 * @class WorkbookPart
	 */

	var WorkbookPart = OpenXmlPart.register((_temp$v = _class$v = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(WorkbookPart, _OpenXmlPurePart);

	  var _super = _createSuper$F(WorkbookPart);

	  //#region override the shemas infomation and so on
	  //#endregion

	  /**
	   * constructor
	   * @param {*} _opt 
	   */
	  function WorkbookPart(_opt) {
	    var _this;

	    _classCallCheck(this, WorkbookPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), "data", _this.primaryElement);
	    return _this;
	  }
	  /**
	   * get the share string part;
	   */


	  _createClass(WorkbookPart, [{
	    key: "getShareStringPart",
	    value: function () {
	      var _getShareStringPart = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        var part;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this.getRelationPart(ShareStringPart);

	              case 2:
	                part = _context.sent;

	                if (part) {
	                  _context.next = 8;
	                  break;
	                }

	                _context.next = 6;
	                return ShareStringPart.create(this["package"], path__default['default'].join(path__default['default'].dirname(this.path), "sharedStrings.xml"));

	              case 6:
	                part = _context.sent;
	                part && this.insertRelationPart(part);

	              case 8:
	                return _context.abrupt("return", part);

	              case 9:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function getShareStringPart() {
	        return _getShareStringPart.apply(this, arguments);
	      }

	      return getShareStringPart;
	    }()
	    /**
	     * get a share string in the given position
	     * @param {Number} _index the position of the string
	     * @return {ShareStringItem}
	     */

	  }, {
	    key: "getShareString",
	    value: function () {
	      var _getShareString = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_index) {
	        var part, list;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this.getShareStringPart();

	              case 2:
	                part = _context2.sent;
	                list = part && part.items;
	                return _context2.abrupt("return", list && list[_index]);

	              case 5:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function getShareString(_x) {
	        return _getShareString.apply(this, arguments);
	      }

	      return getShareString;
	    }()
	    /**
	     * add a share string
	     * @param {String} _text the value of the string
	     */

	  }, {
	    key: "addShareString",
	    value: function () {
	      var _addShareString = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_text) {
	        var part;
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                _context3.next = 2;
	                return this.getShareStringPart();

	              case 2:
	                part = _context3.sent;
	                return _context3.abrupt("return", part && part.add(_text));

	              case 4:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function addShareString(_x2) {
	        return _addShareString.apply(this, arguments);
	      }

	      return addShareString;
	    }()
	    /**
	     * get a sheet part by the index of the sheet
	     * @param {Number} _index the index of the sheet
	     * @return {SheetPart}
	     */

	  }, {
	    key: "getSheetByIndex",
	    value: function () {
	      var _getSheetByIndex = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_index) {
	        var id;
	        return regenerator.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                id = this.data.sheetList.getSheetId(Number(_index));
	                _context4.t0 = id;

	                if (!_context4.t0) {
	                  _context4.next = 6;
	                  break;
	                }

	                _context4.next = 5;
	                return this.getRelationPart(id.relationshipId);

	              case 5:
	                _context4.t0 = _context4.sent;

	              case 6:
	                return _context4.abrupt("return", _context4.t0);

	              case 7:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function getSheetByIndex(_x3) {
	        return _getSheetByIndex.apply(this, arguments);
	      }

	      return getSheetByIndex;
	    }()
	    /**
	     * get a sheet part by the name of the sheet
	     * @param {String} _name the name of the sheet
	     * @return {SheetPart}
	     */

	  }, {
	    key: "getSheetByName",
	    value: function () {
	      var _getSheetByName = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(_name) {
	        var id;
	        return regenerator.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                id = this.data.sheetList.getSheetIdByName(_name);
	                _context5.t0 = id;

	                if (!_context5.t0) {
	                  _context5.next = 6;
	                  break;
	                }

	                _context5.next = 5;
	                return this.getRelationPart(id.relationshipId);

	              case 5:
	                _context5.t0 = _context5.sent;

	              case 6:
	                return _context5.abrupt("return", _context5.t0);

	              case 7:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function getSheetByName(_x4) {
	        return _getSheetByName.apply(this, arguments);
	      }

	      return getSheetByName;
	    }()
	  }]);

	  return WorkbookPart;
	}(OpenXmlPurePart), _defineProperty(_class$v, "SchemasURI", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), _defineProperty(_class$v, "ContentType", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"), _defineProperty(_class$v, "DefaultPath", "xl/workbook.xml"), _temp$v));

	var _class$w, _temp$w;

	function _createSuper$G(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$H(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$H() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	/**
	 * Class of operating the sheet part
	 * @class SheetPart
	 */

	var SheetPart = OpenXmlPart.register((_temp$w = _class$w = /*#__PURE__*/function (_OpenXmlPurePart) {
	  _inherits(SheetPart, _OpenXmlPurePart);

	  var _super = _createSuper$G(SheetPart);

	  //#region override the shemas infomation and so on
	  //#endregion

	  /**
	   * constructor
	   * @param {*} _opt 
	   */
	  function SheetPart(_opt) {
	    var _this;

	    _classCallCheck(this, SheetPart);

	    _this = _super.call(this, _opt);
	    readonly(_assertThisInitialized(_this), "workSheet", _this.primaryElement);
	    return _this;
	  }
	  /**
	   * get the data of the sheet
	   */


	  _createClass(SheetPart, [{
	    key: "data",
	    get: function get() {
	      var data = this.workSheet.childOne(SheetData);

	      if (!data) {
	        data = this.workSheet.createElement(SheetData);
	        data && this.workSheet.appendChild(data);
	      }

	      return data;
	    }
	    /**
	     * get the informations of the column
	     */

	  }, {
	    key: "columnInformations",
	    get: function get() {
	      var cols = this.workSheet.childOne(ColumnInformationSet);

	      if (!cols) {
	        cols = this.workSheet.createElement(ColumnInformationSet);
	        cols && this.workSheet.appendChild(cols);
	      }

	      return cols;
	    }
	  }]);

	  return SheetPart;
	}(OpenXmlPurePart), _defineProperty(_class$w, "SchemasURI", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"), _defineProperty(_class$w, "ContentType", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"), _temp$w));

	var index$8 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  WorkbookPart: WorkbookPart,
	  SheetPart: SheetPart
	});

	var index$9 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  presentation: index$6,
	  wordprocessing: index$7,
	  spreadsheet: index$8
	});

	exports.IApplication = IApplication;
	exports.IDom = IDom;
	exports.IZip = IZip;
	exports.OpenXmlAttribute = OpenXmlAttribute;
	exports.OpenXmlBinaryPart = OpenXmlBinaryPart;
	exports.OpenXmlElement = OpenXmlElement;
	exports.OpenXmlPackage = OpenXmlPackage$1;
	exports.OpenXmlPart = OpenXmlPart;
	exports.OpenXmlPurePart = OpenXmlPurePart;
	exports.constants = constants;
	exports.error = error;
	exports.genRandId = genRandId$1;
	exports.parts = index$9;
	exports.readonly = readonly;
	exports.schemas = index$5;

	});

	unwrapExports(_dist);
	var _dist_1 = _dist.IApplication;
	var _dist_2 = _dist.IDom;
	var _dist_3 = _dist.IZip;
	var _dist_4 = _dist.OpenXmlAttribute;
	var _dist_5 = _dist.OpenXmlBinaryPart;
	var _dist_6 = _dist.OpenXmlElement;
	var _dist_7 = _dist.OpenXmlPackage;
	var _dist_8 = _dist.OpenXmlPart;
	var _dist_9 = _dist.OpenXmlPurePart;
	var _dist_10 = _dist.constants;
	var _dist_11 = _dist.error;
	var _dist_12 = _dist.genRandId;
	var _dist_13 = _dist.parts;
	var _dist_14 = _dist.readonly;
	var _dist_15 = _dist.schemas;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var IDom = _dist.IDom,
	    IZip = _dist.IZip,
	    IApplication = _dist.IApplication; // const JSZip = require("jszip");
	//#region Implementation of IZip

	var $zip = Symbol("app.zip");
	/**
	 * Implementation of IZip using jzsip
	 */

	var Zip = /*#__PURE__*/function (_IZip) {
	  _inherits(Zip, _IZip);

	  var _super = _createSuper(Zip);

	  function Zip() {
	    var _this;

	    _classCallCheck(this, Zip);

	    _this = _super.call(this);
	    _this[$zip] = new JSZip();
	    return _this;
	  }

	  _createClass(Zip, [{
	    key: "getFile",
	    value: function () {
	      var _getFile = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_file, _format) {
	        var file;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                file = this[$zip].file(String(_file).replace(/\\/ig, "/").replace(/^\//, ""));
	                _context.t0 = file;

	                if (!_context.t0) {
	                  _context.next = 6;
	                  break;
	                }

	                _context.next = 5;
	                return file.async("binary" === _format ? "uint8array" : "text");

	              case 5:
	                _context.t0 = _context.sent;

	              case 6:
	                return _context.abrupt("return", _context.t0);

	              case 7:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function getFile(_x, _x2) {
	        return _getFile.apply(this, arguments);
	      }

	      return getFile;
	    }()
	  }, {
	    key: "setFile",
	    value: function setFile(_file, _content, _format) {
	      this[$zip].file(String(_file).replace(/\\/ig, "/").replace(/^\//, ""), _content, {
	        binary: _format == "binary"
	      });
	    }
	  }, {
	    key: "load",
	    value: function () {
	      var _load = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_file) {
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this[$zip].loadAsync(_file);

	              case 2:
	                return _context2.abrupt("return", this);

	              case 3:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function load(_x3) {
	        return _load.apply(this, arguments);
	      }

	      return load;
	    }()
	  }, {
	    key: "save",
	    value: function save() {
	      return this[$zip].generateAsync({
	        type: "blob",
	        compression: "DEFLATE",
	        compressionOptions: {
	          level: 9
	        }
	      });
	    }
	  }]);

	  return Zip;
	}(IZip); //#endregion
	//#region Implementation of IDom, implemented by Node in this situation

	/**
	 * select node by xpath expression in Node object
	 * @param {String} _expression the xpath expression
	 * @param {Boolean} _isSingle true for selecting the first matched node, false for selecting all matched node
	 */


	Node.prototype.xpathSelect = function (_expression, _isSingle) {
	  var exp = document.createExpression(_expression);

	  if (exp) {
	    var result = exp.evaluate(this);

	    if (result) {
	      var list = undefined;
	      var item;

	      while (item = result.iterateNext()) {
	        if (_isSingle) {
	          return item;
	        }

	        (list || (list = [])).push(item);
	      }

	      return list;
	    }
	  }
	};
	/**
	 * check if a node is an element
	 * @param {Node} _node 
	 */


	Node.isElementNode = function (_node) {
	  return _node instanceof Node && _node.nodeType === 1;
	};
	/**
	 * parse a XML string into an instance of DOM
	 * @param {*} _xmlString 
	 */


	Node.parse = function (_xmlString) {
	  return new DOMParser().parseFromString(String(_xmlString), "text/xml");
	};
	/**
	 * serialize the node to XML string
	 */


	Node.prototype.toString = function () {
	  return new XMLSerializer().serializeToString(this);
	};

	var Dom = Node; //#endregion
	//#region Implementation of IApplication

	var Application = /*#__PURE__*/function (_IApplication) {
	  _inherits(Application, _IApplication);

	  var _super2 = _createSuper(Application);

	  function Application() {
	    _classCallCheck(this, Application);

	    return _super2.call(this);
	  }

	  _createClass(Application, null, [{
	    key: "pickFile",
	    value: function pickFile(_fileType) {
	      return new Promise(function (resoleve, reject) {
	        try {
	          var inputElement = document.createElement("input");
	          inputElement.type = "file";
	          _fileType && (inputElement.accept = _fileType);
	          inputElement.addEventListener("change", function () {
	            var files = inputElement.files;

	            if (files.length > 0) {
	              resoleve(files[0]);
	            } else {
	              reject(0);
	            }
	          });
	          inputElement.click();
	        } catch (error) {
	          reject(error);
	        }
	      });
	    }
	  }, {
	    key: "dynInvokeLink",
	    value: function dynInvokeLink(_url, _opt) {
	      if (_url) {
	        var aElement = document.createElement("a");

	        if (aElement) {
	          aElement.href = _url;
	          aElement.rel = "noopener";

	          if (_opt) {
	            for (var name in _opt) {
	              aElement[name] = _opt[name];
	            }
	          }

	          aElement.click();
	        }
	      }
	    }
	  }, {
	    key: "saveToFile",
	    value: function saveToFile(_blob, _filter) {
	      var url = URL.createObjectURL(_blob);
	      this.dynInvokeLink(url, {
	        download: "*.".concat(_filter)
	      });
	      URL.revokeObjectURL(url);
	    }
	  }]);

	  return Application;
	}(IApplication); //#endregion


	_defineProperty(Application, "ZIP", Zip);

	_defineProperty(Application, "DOM", Dom);

	var application = {
	  Zip: Zip,
	  Node: Node,
	  Application: Application
	};

	function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	var OpenXmlAttribute = _dist.OpenXmlAttribute,
	    OpenXmlElement = _dist.OpenXmlElement,
	    OpenXmlPackage = _dist.OpenXmlPackage,
	    OpenXmlPurePart = _dist.OpenXmlPurePart,
	    parts = _dist.parts,
	    schemas = _dist.schemas;
	var Application$1 = application.Application;

	function save(_x) {
	  return _save.apply(this, arguments);
	}

	function _save() {
	  _save = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_zip) {
	    var val;
	    return regenerator.wrap(function _callee2$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return _zip.save();

	          case 2:
	            val = _context3.sent;
	            Application$1.saveToFile(val, "pptx");

	          case 4:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _save.apply(this, arguments);
	}

	var testPPT = /*#__PURE__*/function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	    var doSave, fileBuf, pkg, presentation, textSet, _iterator, _step, _loop, div;

	    return regenerator.wrap(function _callee$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.prev = 0;
	            doSave = false;
	            _context2.next = 4;
	            return Application$1.pickFile(".pptx");

	          case 4:
	            fileBuf = _context2.sent;
	            _context2.next = 7;
	            return OpenXmlPackage.open(Application$1, fileBuf);

	          case 7:
	            pkg = _context2.sent;
	            _context2.next = 10;
	            return parts.presentation.PresentationPart.load(pkg, "/ppt/presentation.xml");

	          case 10:
	            presentation = _context2.sent;
	            console.log("The count of the slides in this presentation = ", presentation.slideSet.count);
	            textSet = [];
	            _iterator = _createForOfIteratorHelper(presentation.slideSet.slides());
	            _context2.prev = 14;
	            _loop = /*#__PURE__*/regenerator.mark(function _loop() {
	              var item, slidePart, textContent;
	              return regenerator.wrap(function _loop$(_context) {
	                while (1) {
	                  switch (_context.prev = _context.next) {
	                    case 0:
	                      item = _step.value;
	                      _context.next = 3;
	                      return item.getter;

	                    case 3:
	                      slidePart = _context.sent;
	                      textContent = [];

	                      if (slidePart) {
	                        console.log("\tprocessing page ", item.inde);
	                        slidePart.slide.commonData.descendants(schemas.drawing.TextBody).map(function (textBody) {
	                          return textBody.textContent.trim() && textContent.push(textBody.textContent);
	                        });
	                      }

	                      textSet.push(textContent.join("<br />"));

	                    case 7:
	                    case "end":
	                      return _context.stop();
	                  }
	                }
	              }, _loop);
	            });

	            _iterator.s();

	          case 17:
	            if ((_step = _iterator.n()).done) {
	              _context2.next = 21;
	              break;
	            }

	            return _context2.delegateYield(_loop(), "t0", 19);

	          case 19:
	            _context2.next = 17;
	            break;

	          case 21:
	            _context2.next = 26;
	            break;

	          case 23:
	            _context2.prev = 23;
	            _context2.t1 = _context2["catch"](14);

	            _iterator.e(_context2.t1);

	          case 26:
	            _context2.prev = 26;

	            _iterator.f();

	            return _context2.finish(26);

	          case 29:
	            console.log("all text in this presentaion are:");
	            console.log(textSet);
	            div = document.getElementById("result");
	            div.innerHTML = "The count of the slides in this presentation = ".concat(presentation.slideSet.count, " <br />\n        ").concat(textSet.map(function (item, index) {
	              return "[Page ".concat(index + 1, "] <br />").concat(item);
	            }).join("<br />"));
	            _context2.t2 = doSave;

	            if (!_context2.t2) {
	              _context2.next = 37;
	              break;
	            }

	            _context2.next = 37;
	            return save(pkg);

	          case 37:
	            _context2.next = 42;
	            break;

	          case 39:
	            _context2.prev = 39;
	            _context2.t3 = _context2["catch"](0);
	            console.error(_context2.t3);

	          case 42:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee, null, [[0, 39], [14, 23, 26, 29]]);
	  }));

	  return function testPPT() {
	    return _ref.apply(this, arguments);
	  };
	}();

	return testPPT;

}());
//# sourceMappingURL=testPPT.js.map
