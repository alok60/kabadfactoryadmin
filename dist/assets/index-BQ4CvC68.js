(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const u of n)
      if (u.type === "childList")
        for (const i of u.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(n) {
    const u = {};
    return (
      n.integrity && (u.integrity = n.integrity),
      n.referrerPolicy && (u.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const u = l(n);
    fetch(n.href, u);
  }
})();
function Oo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var To = { exports: {} },
  j = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ps = Symbol.for("react.transitional.element"),
  Ih = Symbol.for("react.portal"),
  t0 = Symbol.for("react.fragment"),
  e0 = Symbol.for("react.strict_mode"),
  l0 = Symbol.for("react.profiler"),
  a0 = Symbol.for("react.consumer"),
  n0 = Symbol.for("react.context"),
  u0 = Symbol.for("react.forward_ref"),
  i0 = Symbol.for("react.suspense"),
  c0 = Symbol.for("react.memo"),
  Ro = Symbol.for("react.lazy"),
  Mf = Symbol.iterator;
function s0(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (Mf && t[Mf]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var _o = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Do = Object.assign,
  Mo = {};
function Da(t, e, l) {
  ((this.props = t),
    (this.context = e),
    (this.refs = Mo),
    (this.updater = l || _o));
}
Da.prototype.isReactComponent = {};
Da.prototype.setState = function (t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
Da.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function No() {}
No.prototype = Da.prototype;
function gs(t, e, l) {
  ((this.props = t),
    (this.context = e),
    (this.refs = Mo),
    (this.updater = l || _o));
}
var vs = (gs.prototype = new No());
vs.constructor = gs;
Do(vs, Da.prototype);
vs.isPureReactComponent = !0;
var Nf = Array.isArray,
  ut = { H: null, A: null, T: null, S: null, V: null },
  Co = Object.prototype.hasOwnProperty;
function bs(t, e, l, a, n, u) {
  return (
    (l = u.ref),
    { $$typeof: ps, type: t, key: e, ref: l !== void 0 ? l : null, props: u }
  );
}
function f0(t, e) {
  return bs(t.type, e, void 0, void 0, void 0, t.props);
}
function Ss(t) {
  return typeof t == "object" && t !== null && t.$$typeof === ps;
}
function r0(t) {
  var e = { "=": "=0", ":": "=2" };
  return (
    "$" +
    t.replace(/[=:]/g, function (l) {
      return e[l];
    })
  );
}
var Cf = /\/+/g;
function Mi(t, e) {
  return typeof t == "object" && t !== null && t.key != null
    ? r0("" + t.key)
    : e.toString(36);
}
function zf() {}
function o0(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (
        (typeof t.status == "string"
          ? t.then(zf, zf)
          : ((t.status = "pending"),
            t.then(
              function (e) {
                t.status === "pending" &&
                  ((t.status = "fulfilled"), (t.value = e));
              },
              function (e) {
                t.status === "pending" &&
                  ((t.status = "rejected"), (t.reason = e));
              },
            )),
        t.status)
      ) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function Vl(t, e, l, a, n) {
  var u = typeof t;
  (u === "undefined" || u === "boolean") && (t = null);
  var i = !1;
  if (t === null) i = !0;
  else
    switch (u) {
      case "bigint":
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case ps:
          case Ih:
            i = !0;
            break;
          case Ro:
            return ((i = t._init), Vl(i(t._payload), e, l, a, n));
        }
    }
  if (i)
    return (
      (n = n(t)),
      (i = a === "" ? "." + Mi(t, 0) : a),
      Nf(n)
        ? ((l = ""),
          i != null && (l = i.replace(Cf, "$&/") + "/"),
          Vl(n, e, l, "", function (f) {
            return f;
          }))
        : n != null &&
          (Ss(n) &&
            (n = f0(
              n,
              l +
                (n.key == null || (t && t.key === n.key)
                  ? ""
                  : ("" + n.key).replace(Cf, "$&/") + "/") +
                i,
            )),
          e.push(n)),
      1
    );
  i = 0;
  var c = a === "" ? "." : a + ":";
  if (Nf(t))
    for (var s = 0; s < t.length; s++)
      ((a = t[s]), (u = c + Mi(a, s)), (i += Vl(a, e, l, u, n)));
  else if (((s = s0(t)), typeof s == "function"))
    for (t = s.call(t), s = 0; !(a = t.next()).done; )
      ((a = a.value), (u = c + Mi(a, s++)), (i += Vl(a, e, l, u, n)));
  else if (u === "object") {
    if (typeof t.then == "function") return Vl(o0(t), e, l, a, n);
    throw (
      (e = String(t)),
      Error(
        "Objects are not valid as a React child (found: " +
          (e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return i;
}
function $n(t, e, l) {
  if (t == null) return t;
  var a = [],
    n = 0;
  return (
    Vl(t, a, "", "", function (u) {
      return e.call(l, u, n++);
    }),
    a
  );
}
function d0(t) {
  if (t._status === -1) {
    var e = t._result;
    ((e = e()),
      e.then(
        function (l) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 1), (t._result = l));
        },
        function (l) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 2), (t._result = l));
        },
      ),
      t._status === -1 && ((t._status = 0), (t._result = e)));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var Uf =
  typeof reportError == "function"
    ? reportError
    : function (t) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var e = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof t == "object" && t !== null && typeof t.message == "string"
                ? String(t.message)
                : String(t),
            error: t,
          });
          if (!window.dispatchEvent(e)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", t);
          return;
        }
        console.error(t);
      };
function m0() {}
j.Children = {
  map: $n,
  forEach: function (t, e, l) {
    $n(
      t,
      function () {
        e.apply(this, arguments);
      },
      l,
    );
  },
  count: function (t) {
    var e = 0;
    return (
      $n(t, function () {
        e++;
      }),
      e
    );
  },
  toArray: function (t) {
    return (
      $n(t, function (e) {
        return e;
      }) || []
    );
  },
  only: function (t) {
    if (!Ss(t))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return t;
  },
};
j.Component = Da;
j.Fragment = t0;
j.Profiler = l0;
j.PureComponent = gs;
j.StrictMode = e0;
j.Suspense = i0;
j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ut;
j.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (t) {
    return ut.H.useMemoCache(t);
  },
};
j.cache = function (t) {
  return function () {
    return t.apply(null, arguments);
  };
};
j.cloneElement = function (t, e, l) {
  if (t == null)
    throw Error(
      "The argument must be a React element, but you passed " + t + ".",
    );
  var a = Do({}, t.props),
    n = t.key,
    u = void 0;
  if (e != null)
    for (i in (e.ref !== void 0 && (u = void 0),
    e.key !== void 0 && (n = "" + e.key),
    e))
      !Co.call(e, i) ||
        i === "key" ||
        i === "__self" ||
        i === "__source" ||
        (i === "ref" && e.ref === void 0) ||
        (a[i] = e[i]);
  var i = arguments.length - 2;
  if (i === 1) a.children = l;
  else if (1 < i) {
    for (var c = Array(i), s = 0; s < i; s++) c[s] = arguments[s + 2];
    a.children = c;
  }
  return bs(t.type, n, void 0, void 0, u, a);
};
j.createContext = function (t) {
  return (
    (t = {
      $$typeof: n0,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (t.Provider = t),
    (t.Consumer = { $$typeof: a0, _context: t }),
    t
  );
};
j.createElement = function (t, e, l) {
  var a,
    n = {},
    u = null;
  if (e != null)
    for (a in (e.key !== void 0 && (u = "" + e.key), e))
      Co.call(e, a) &&
        a !== "key" &&
        a !== "__self" &&
        a !== "__source" &&
        (n[a] = e[a]);
  var i = arguments.length - 2;
  if (i === 1) n.children = l;
  else if (1 < i) {
    for (var c = Array(i), s = 0; s < i; s++) c[s] = arguments[s + 2];
    n.children = c;
  }
  if (t && t.defaultProps)
    for (a in ((i = t.defaultProps), i)) n[a] === void 0 && (n[a] = i[a]);
  return bs(t, u, void 0, void 0, null, n);
};
j.createRef = function () {
  return { current: null };
};
j.forwardRef = function (t) {
  return { $$typeof: u0, render: t };
};
j.isValidElement = Ss;
j.lazy = function (t) {
  return { $$typeof: Ro, _payload: { _status: -1, _result: t }, _init: d0 };
};
j.memo = function (t, e) {
  return { $$typeof: c0, type: t, compare: e === void 0 ? null : e };
};
j.startTransition = function (t) {
  var e = ut.T,
    l = {};
  ut.T = l;
  try {
    var a = t(),
      n = ut.S;
    (n !== null && n(l, a),
      typeof a == "object" &&
        a !== null &&
        typeof a.then == "function" &&
        a.then(m0, Uf));
  } catch (u) {
    Uf(u);
  } finally {
    ut.T = e;
  }
};
j.unstable_useCacheRefresh = function () {
  return ut.H.useCacheRefresh();
};
j.use = function (t) {
  return ut.H.use(t);
};
j.useActionState = function (t, e, l) {
  return ut.H.useActionState(t, e, l);
};
j.useCallback = function (t, e) {
  return ut.H.useCallback(t, e);
};
j.useContext = function (t) {
  return ut.H.useContext(t);
};
j.useDebugValue = function () {};
j.useDeferredValue = function (t, e) {
  return ut.H.useDeferredValue(t, e);
};
j.useEffect = function (t, e, l) {
  var a = ut.H;
  if (typeof l == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React.",
    );
  return a.useEffect(t, e);
};
j.useId = function () {
  return ut.H.useId();
};
j.useImperativeHandle = function (t, e, l) {
  return ut.H.useImperativeHandle(t, e, l);
};
j.useInsertionEffect = function (t, e) {
  return ut.H.useInsertionEffect(t, e);
};
j.useLayoutEffect = function (t, e) {
  return ut.H.useLayoutEffect(t, e);
};
j.useMemo = function (t, e) {
  return ut.H.useMemo(t, e);
};
j.useOptimistic = function (t, e) {
  return ut.H.useOptimistic(t, e);
};
j.useReducer = function (t, e, l) {
  return ut.H.useReducer(t, e, l);
};
j.useRef = function (t) {
  return ut.H.useRef(t);
};
j.useState = function (t) {
  return ut.H.useState(t);
};
j.useSyncExternalStore = function (t, e, l) {
  return ut.H.useSyncExternalStore(t, e, l);
};
j.useTransition = function () {
  return ut.H.useTransition();
};
j.version = "19.1.0";
To.exports = j;
var L = To.exports;
const v = Oo(L);
var zo = { exports: {} },
  ci = {},
  Uo = { exports: {} },
  xo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (t) {
  function e(S, C) {
    var U = S.length;
    S.push(C);
    t: for (; 0 < U; ) {
      var H = (U - 1) >>> 1,
        O = S[H];
      if (0 < n(O, C)) ((S[H] = C), (S[U] = O), (U = H));
      else break t;
    }
  }
  function l(S) {
    return S.length === 0 ? null : S[0];
  }
  function a(S) {
    if (S.length === 0) return null;
    var C = S[0],
      U = S.pop();
    if (U !== C) {
      S[0] = U;
      t: for (var H = 0, O = S.length, x = O >>> 1; H < x; ) {
        var k = 2 * (H + 1) - 1,
          st = S[k],
          ot = k + 1,
          yl = S[ot];
        if (0 > n(st, U))
          ot < O && 0 > n(yl, st)
            ? ((S[H] = yl), (S[ot] = U), (H = ot))
            : ((S[H] = st), (S[k] = U), (H = k));
        else if (ot < O && 0 > n(yl, U)) ((S[H] = yl), (S[ot] = U), (H = ot));
        else break t;
      }
    }
    return C;
  }
  function n(S, C) {
    var U = S.sortIndex - C.sortIndex;
    return U !== 0 ? U : S.id - C.id;
  }
  if (
    ((t.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var u = performance;
    t.unstable_now = function () {
      return u.now();
    };
  } else {
    var i = Date,
      c = i.now();
    t.unstable_now = function () {
      return i.now() - c;
    };
  }
  var s = [],
    f = [],
    d = 1,
    y = null,
    m = 3,
    p = !1,
    T = !1,
    A = !1,
    R = !1,
    o = typeof setTimeout == "function" ? setTimeout : null,
    r = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  function b(S) {
    for (var C = l(f); C !== null; ) {
      if (C.callback === null) a(f);
      else if (C.startTime <= S)
        (a(f), (C.sortIndex = C.expirationTime), e(s, C));
      else break;
      C = l(f);
    }
  }
  function _(S) {
    if (((A = !1), b(S), !T))
      if (l(s) !== null) ((T = !0), N || ((N = !0), St()));
      else {
        var C = l(f);
        C !== null && qt(_, C.startTime - S);
      }
  }
  var N = !1,
    D = -1,
    z = 5,
    X = -1;
  function w() {
    return R ? !0 : !(t.unstable_now() - X < z);
  }
  function tt() {
    if (((R = !1), N)) {
      var S = t.unstable_now();
      X = S;
      var C = !0;
      try {
        t: {
          ((T = !1), A && ((A = !1), r(D), (D = -1)), (p = !0));
          var U = m;
          try {
            e: {
              for (
                b(S), y = l(s);
                y !== null && !(y.expirationTime > S && w());
              ) {
                var H = y.callback;
                if (typeof H == "function") {
                  ((y.callback = null), (m = y.priorityLevel));
                  var O = H(y.expirationTime <= S);
                  if (((S = t.unstable_now()), typeof O == "function")) {
                    ((y.callback = O), b(S), (C = !0));
                    break e;
                  }
                  (y === l(s) && a(s), b(S));
                } else a(s);
                y = l(s);
              }
              if (y !== null) C = !0;
              else {
                var x = l(f);
                (x !== null && qt(_, x.startTime - S), (C = !1));
              }
            }
            break t;
          } finally {
            ((y = null), (m = U), (p = !1));
          }
          C = void 0;
        }
      } finally {
        C ? St() : (N = !1);
      }
    }
  }
  var St;
  if (typeof h == "function")
    St = function () {
      h(tt);
    };
  else if (typeof MessageChannel < "u") {
    var Oe = new MessageChannel(),
      Et = Oe.port2;
    ((Oe.port1.onmessage = tt),
      (St = function () {
        Et.postMessage(null);
      }));
  } else
    St = function () {
      o(tt, 0);
    };
  function qt(S, C) {
    D = o(function () {
      S(t.unstable_now());
    }, C);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (S) {
      S.callback = null;
    }),
    (t.unstable_forceFrameRate = function (S) {
      0 > S || 125 < S
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (z = 0 < S ? Math.floor(1e3 / S) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (t.unstable_next = function (S) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = m;
      }
      var U = m;
      m = C;
      try {
        return S();
      } finally {
        m = U;
      }
    }),
    (t.unstable_requestPaint = function () {
      R = !0;
    }),
    (t.unstable_runWithPriority = function (S, C) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var U = m;
      m = S;
      try {
        return C();
      } finally {
        m = U;
      }
    }),
    (t.unstable_scheduleCallback = function (S, C, U) {
      var H = t.unstable_now();
      switch (
        (typeof U == "object" && U !== null
          ? ((U = U.delay), (U = typeof U == "number" && 0 < U ? H + U : H))
          : (U = H),
        S)
      ) {
        case 1:
          var O = -1;
          break;
        case 2:
          O = 250;
          break;
        case 5:
          O = 1073741823;
          break;
        case 4:
          O = 1e4;
          break;
        default:
          O = 5e3;
      }
      return (
        (O = U + O),
        (S = {
          id: d++,
          callback: C,
          priorityLevel: S,
          startTime: U,
          expirationTime: O,
          sortIndex: -1,
        }),
        U > H
          ? ((S.sortIndex = U),
            e(f, S),
            l(s) === null &&
              S === l(f) &&
              (A ? (r(D), (D = -1)) : (A = !0), qt(_, U - H)))
          : ((S.sortIndex = O),
            e(s, S),
            T || p || ((T = !0), N || ((N = !0), St()))),
        S
      );
    }),
    (t.unstable_shouldYield = w),
    (t.unstable_wrapCallback = function (S) {
      var C = m;
      return function () {
        var U = m;
        m = C;
        try {
          return S.apply(this, arguments);
        } finally {
          m = U;
        }
      };
    }));
})(xo);
Uo.exports = xo;
var h0 = Uo.exports,
  wo = { exports: {} },
  Ht = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var y0 = L;
function Bo(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Qe() {}
var Bt = {
    d: {
      f: Qe,
      r: function () {
        throw Error(Bo(522));
      },
      D: Qe,
      C: Qe,
      L: Qe,
      m: Qe,
      X: Qe,
      S: Qe,
      M: Qe,
    },
    p: 0,
    findDOMNode: null,
  },
  p0 = Symbol.for("react.portal");
function g0(t, e, l) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: p0,
    key: a == null ? null : "" + a,
    children: t,
    containerInfo: e,
    implementation: l,
  };
}
var Wa = y0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function si(t, e) {
  if (t === "font") return "";
  if (typeof e == "string") return e === "use-credentials" ? e : "";
}
Ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Bt;
Ht.createPortal = function (t, e) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
    throw Error(Bo(299));
  return g0(t, e, null, l);
};
Ht.flushSync = function (t) {
  var e = Wa.T,
    l = Bt.p;
  try {
    if (((Wa.T = null), (Bt.p = 2), t)) return t();
  } finally {
    ((Wa.T = e), (Bt.p = l), Bt.d.f());
  }
};
Ht.preconnect = function (t, e) {
  typeof t == "string" &&
    (e
      ? ((e = e.crossOrigin),
        (e =
          typeof e == "string" ? (e === "use-credentials" ? e : "") : void 0))
      : (e = null),
    Bt.d.C(t, e));
};
Ht.prefetchDNS = function (t) {
  typeof t == "string" && Bt.d.D(t);
};
Ht.preinit = function (t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var l = e.as,
      a = si(l, e.crossOrigin),
      n = typeof e.integrity == "string" ? e.integrity : void 0,
      u = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
    l === "style"
      ? Bt.d.S(t, typeof e.precedence == "string" ? e.precedence : void 0, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
        })
      : l === "script" &&
        Bt.d.X(t, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
  }
};
Ht.preinitModule = function (t, e) {
  if (typeof t == "string")
    if (typeof e == "object" && e !== null) {
      if (e.as == null || e.as === "script") {
        var l = si(e.as, e.crossOrigin);
        Bt.d.M(t, {
          crossOrigin: l,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
      }
    } else e == null && Bt.d.M(t);
};
Ht.preload = function (t, e) {
  if (
    typeof t == "string" &&
    typeof e == "object" &&
    e !== null &&
    typeof e.as == "string"
  ) {
    var l = e.as,
      a = si(l, e.crossOrigin);
    Bt.d.L(t, l, {
      crossOrigin: a,
      integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      nonce: typeof e.nonce == "string" ? e.nonce : void 0,
      type: typeof e.type == "string" ? e.type : void 0,
      fetchPriority:
        typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
      referrerPolicy:
        typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
      imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
      imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
      media: typeof e.media == "string" ? e.media : void 0,
    });
  }
};
Ht.preloadModule = function (t, e) {
  if (typeof t == "string")
    if (e) {
      var l = si(e.as, e.crossOrigin);
      Bt.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: l,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      });
    } else Bt.d.m(t);
};
Ht.requestFormReset = function (t) {
  Bt.d.r(t);
};
Ht.unstable_batchedUpdates = function (t, e) {
  return t(e);
};
Ht.useFormState = function (t, e, l) {
  return Wa.H.useFormState(t, e, l);
};
Ht.useFormStatus = function () {
  return Wa.H.useHostTransitionStatus();
};
Ht.version = "19.1.0";
function Ho() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ho);
    } catch (t) {
      console.error(t);
    }
}
(Ho(), (wo.exports = Ht));
var v0 = wo.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bt = h0,
  qo = L,
  b0 = v0;
function E(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Lo(t) {
  return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
}
function Mn(t) {
  var e = t,
    l = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do ((e = t), e.flags & 4098 && (l = e.return), (t = e.return));
    while (t);
  }
  return e.tag === 3 ? l : null;
}
function jo(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (
      (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
      e !== null)
    )
      return e.dehydrated;
  }
  return null;
}
function xf(t) {
  if (Mn(t) !== t) throw Error(E(188));
}
function S0(t) {
  var e = t.alternate;
  if (!e) {
    if (((e = Mn(t)), e === null)) throw Error(E(188));
    return e !== t ? null : t;
  }
  for (var l = t, a = e; ; ) {
    var n = l.return;
    if (n === null) break;
    var u = n.alternate;
    if (u === null) {
      if (((a = n.return), a !== null)) {
        l = a;
        continue;
      }
      break;
    }
    if (n.child === u.child) {
      for (u = n.child; u; ) {
        if (u === l) return (xf(n), t);
        if (u === a) return (xf(n), e);
        u = u.sibling;
      }
      throw Error(E(188));
    }
    if (l.return !== a.return) ((l = n), (a = u));
    else {
      for (var i = !1, c = n.child; c; ) {
        if (c === l) {
          ((i = !0), (l = n), (a = u));
          break;
        }
        if (c === a) {
          ((i = !0), (a = n), (l = u));
          break;
        }
        c = c.sibling;
      }
      if (!i) {
        for (c = u.child; c; ) {
          if (c === l) {
            ((i = !0), (l = u), (a = n));
            break;
          }
          if (c === a) {
            ((i = !0), (a = u), (l = n));
            break;
          }
          c = c.sibling;
        }
        if (!i) throw Error(E(189));
      }
    }
    if (l.alternate !== a) throw Error(E(190));
  }
  if (l.tag !== 3) throw Error(E(188));
  return l.stateNode.current === l ? t : e;
}
function Yo(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (((e = Yo(t)), e !== null)) return e;
    t = t.sibling;
  }
  return null;
}
var at = Object.assign,
  E0 = Symbol.for("react.element"),
  Fn = Symbol.for("react.transitional.element"),
  Ka = Symbol.for("react.portal"),
  Jl = Symbol.for("react.fragment"),
  Xo = Symbol.for("react.strict_mode"),
  hc = Symbol.for("react.profiler"),
  A0 = Symbol.for("react.provider"),
  Go = Symbol.for("react.consumer"),
  Ce = Symbol.for("react.context"),
  Es = Symbol.for("react.forward_ref"),
  yc = Symbol.for("react.suspense"),
  pc = Symbol.for("react.suspense_list"),
  As = Symbol.for("react.memo"),
  Ze = Symbol.for("react.lazy"),
  gc = Symbol.for("react.activity"),
  O0 = Symbol.for("react.memo_cache_sentinel"),
  wf = Symbol.iterator;
function qa(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (wf && t[wf]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var T0 = Symbol.for("react.client.reference");
function vc(t) {
  if (t == null) return null;
  if (typeof t == "function")
    return t.$$typeof === T0 ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Jl:
      return "Fragment";
    case hc:
      return "Profiler";
    case Xo:
      return "StrictMode";
    case yc:
      return "Suspense";
    case pc:
      return "SuspenseList";
    case gc:
      return "Activity";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case Ka:
        return "Portal";
      case Ce:
        return (t.displayName || "Context") + ".Provider";
      case Go:
        return (t._context.displayName || "Context") + ".Consumer";
      case Es:
        var e = t.render;
        return (
          (t = t.displayName),
          t ||
            ((t = e.displayName || e.name || ""),
            (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
          t
        );
      case As:
        return (
          (e = t.displayName || null),
          e !== null ? e : vc(t.type) || "Memo"
        );
      case Ze:
        ((e = t._payload), (t = t._init));
        try {
          return vc(t(e));
        } catch {}
    }
  return null;
}
var Ja = Array.isArray,
  B = qo.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  J = b0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Ol = { pending: !1, data: null, method: null, action: null },
  bc = [],
  $l = -1;
function Ee(t) {
  return { current: t };
}
function Rt(t) {
  0 > $l || ((t.current = bc[$l]), (bc[$l] = null), $l--);
}
function it(t, e) {
  ($l++, (bc[$l] = t.current), (t.current = e));
}
var ve = Ee(null),
  mn = Ee(null),
  ll = Ee(null),
  Du = Ee(null);
function Mu(t, e) {
  switch ((it(ll, e), it(mn, t), it(ve, null), e.nodeType)) {
    case 9:
    case 11:
      t = (t = e.documentElement) && (t = t.namespaceURI) ? jr(t) : 0;
      break;
    default:
      if (((t = e.tagName), (e = e.namespaceURI)))
        ((e = jr(e)), (t = uh(e, t)));
      else
        switch (t) {
          case "svg":
            t = 1;
            break;
          case "math":
            t = 2;
            break;
          default:
            t = 0;
        }
  }
  (Rt(ve), it(ve, t));
}
function ha() {
  (Rt(ve), Rt(mn), Rt(ll));
}
function Sc(t) {
  t.memoizedState !== null && it(Du, t);
  var e = ve.current,
    l = uh(e, t.type);
  e !== l && (it(mn, t), it(ve, l));
}
function Nu(t) {
  (mn.current === t && (Rt(ve), Rt(mn)),
    Du.current === t && (Rt(Du), (On._currentValue = Ol)));
}
var Ec = Object.prototype.hasOwnProperty,
  Os = bt.unstable_scheduleCallback,
  Ni = bt.unstable_cancelCallback,
  R0 = bt.unstable_shouldYield,
  _0 = bt.unstable_requestPaint,
  be = bt.unstable_now,
  D0 = bt.unstable_getCurrentPriorityLevel,
  Qo = bt.unstable_ImmediatePriority,
  Vo = bt.unstable_UserBlockingPriority,
  Cu = bt.unstable_NormalPriority,
  M0 = bt.unstable_LowPriority,
  ko = bt.unstable_IdlePriority,
  N0 = bt.log,
  C0 = bt.unstable_setDisableYieldValue,
  Nn = null,
  Ft = null;
function Pe(t) {
  if (
    (typeof N0 == "function" && C0(t),
    Ft && typeof Ft.setStrictMode == "function")
  )
    try {
      Ft.setStrictMode(Nn, t);
    } catch {}
}
var Wt = Math.clz32 ? Math.clz32 : x0,
  z0 = Math.log,
  U0 = Math.LN2;
function x0(t) {
  return ((t >>>= 0), t === 0 ? 32 : (31 - ((z0(t) / U0) | 0)) | 0);
}
var Wn = 256,
  Pn = 4194304;
function vl(t) {
  var e = t & 42;
  if (e !== 0) return e;
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return t & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return t;
  }
}
function fi(t, e, l) {
  var a = t.pendingLanes;
  if (a === 0) return 0;
  var n = 0,
    u = t.suspendedLanes,
    i = t.pingedLanes;
  t = t.warmLanes;
  var c = a & 134217727;
  return (
    c !== 0
      ? ((a = c & ~u),
        a !== 0
          ? (n = vl(a))
          : ((i &= c),
            i !== 0
              ? (n = vl(i))
              : l || ((l = c & ~t), l !== 0 && (n = vl(l)))))
      : ((c = a & ~u),
        c !== 0
          ? (n = vl(c))
          : i !== 0
            ? (n = vl(i))
            : l || ((l = a & ~t), l !== 0 && (n = vl(l)))),
    n === 0
      ? 0
      : e !== 0 &&
          e !== n &&
          !(e & u) &&
          ((u = n & -n),
          (l = e & -e),
          u >= l || (u === 32 && (l & 4194048) !== 0))
        ? e
        : n
  );
}
function Cn(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function w0(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return e + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Zo() {
  var t = Wn;
  return ((Wn <<= 1), !(Wn & 4194048) && (Wn = 256), t);
}
function Ko() {
  var t = Pn;
  return ((Pn <<= 1), !(Pn & 62914560) && (Pn = 4194304), t);
}
function Ci(t) {
  for (var e = [], l = 0; 31 > l; l++) e.push(t);
  return e;
}
function zn(t, e) {
  ((t.pendingLanes |= e),
    e !== 268435456 &&
      ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
}
function B0(t, e, l, a, n, u) {
  var i = t.pendingLanes;
  ((t.pendingLanes = l),
    (t.suspendedLanes = 0),
    (t.pingedLanes = 0),
    (t.warmLanes = 0),
    (t.expiredLanes &= l),
    (t.entangledLanes &= l),
    (t.errorRecoveryDisabledLanes &= l),
    (t.shellSuspendCounter = 0));
  var c = t.entanglements,
    s = t.expirationTimes,
    f = t.hiddenUpdates;
  for (l = i & ~l; 0 < l; ) {
    var d = 31 - Wt(l),
      y = 1 << d;
    ((c[d] = 0), (s[d] = -1));
    var m = f[d];
    if (m !== null)
      for (f[d] = null, d = 0; d < m.length; d++) {
        var p = m[d];
        p !== null && (p.lane &= -536870913);
      }
    l &= ~y;
  }
  (a !== 0 && Jo(t, a, 0),
    u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e)));
}
function Jo(t, e, l) {
  ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
  var a = 31 - Wt(e);
  ((t.entangledLanes |= e),
    (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 4194090)));
}
function $o(t, e) {
  var l = (t.entangledLanes |= e);
  for (t = t.entanglements; l; ) {
    var a = 31 - Wt(l),
      n = 1 << a;
    ((n & e) | (t[a] & e) && (t[a] |= e), (l &= ~n));
  }
}
function Ts(t) {
  switch (t) {
    case 2:
      t = 1;
      break;
    case 8:
      t = 4;
      break;
    case 32:
      t = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      t = 128;
      break;
    case 268435456:
      t = 134217728;
      break;
    default:
      t = 0;
  }
  return t;
}
function Rs(t) {
  return (
    (t &= -t),
    2 < t ? (8 < t ? (t & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function Fo() {
  var t = J.p;
  return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : yh(t.type));
}
function H0(t, e) {
  var l = J.p;
  try {
    return ((J.p = t), e());
  } finally {
    J.p = l;
  }
}
var ml = Math.random().toString(36).slice(2),
  zt = "__reactFiber$" + ml,
  Gt = "__reactProps$" + ml,
  Ma = "__reactContainer$" + ml,
  Ac = "__reactEvents$" + ml,
  q0 = "__reactListeners$" + ml,
  L0 = "__reactHandles$" + ml,
  Bf = "__reactResources$" + ml,
  Un = "__reactMarker$" + ml;
function _s(t) {
  (delete t[zt], delete t[Gt], delete t[Ac], delete t[q0], delete t[L0]);
}
function Fl(t) {
  var e = t[zt];
  if (e) return e;
  for (var l = t.parentNode; l; ) {
    if ((e = l[Ma] || l[zt])) {
      if (
        ((l = e.alternate),
        e.child !== null || (l !== null && l.child !== null))
      )
        for (t = Gr(t); t !== null; ) {
          if ((l = t[zt])) return l;
          t = Gr(t);
        }
      return e;
    }
    ((t = l), (l = t.parentNode));
  }
  return null;
}
function Na(t) {
  if ((t = t[zt] || t[Ma])) {
    var e = t.tag;
    if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
      return t;
  }
  return null;
}
function $a(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
  throw Error(E(33));
}
function ia(t) {
  var e = t[Bf];
  return (
    e ||
      (e = t[Bf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    e
  );
}
function Ot(t) {
  t[Un] = !0;
}
var Wo = new Set(),
  Po = {};
function ql(t, e) {
  (ya(t, e), ya(t + "Capture", e));
}
function ya(t, e) {
  for (Po[t] = e, t = 0; t < e.length; t++) Wo.add(e[t]);
}
var j0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  Hf = {},
  qf = {};
function Y0(t) {
  return Ec.call(qf, t)
    ? !0
    : Ec.call(Hf, t)
      ? !1
      : j0.test(t)
        ? (qf[t] = !0)
        : ((Hf[t] = !0), !1);
}
function ou(t, e, l) {
  if (Y0(e))
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
          t.removeAttribute(e);
          return;
        case "boolean":
          var a = e.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            t.removeAttribute(e);
            return;
          }
      }
      t.setAttribute(e, "" + l);
    }
}
function In(t, e, l) {
  if (l === null) t.removeAttribute(e);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttribute(e, "" + l);
  }
}
function _e(t, e, l, a) {
  if (a === null) t.removeAttribute(l);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(l);
        return;
    }
    t.setAttributeNS(e, l, "" + a);
  }
}
var zi, Lf;
function kl(t) {
  if (zi === void 0)
    try {
      throw Error();
    } catch (l) {
      var e = l.stack.trim().match(/\n( *(at )?)/);
      ((zi = (e && e[1]) || ""),
        (Lf =
          -1 <
          l.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    zi +
    t +
    Lf
  );
}
var Ui = !1;
function xi(t, e) {
  if (!t || Ui) return "";
  Ui = !0;
  var l = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function () {
        try {
          if (e) {
            var y = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(y.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(y, []);
              } catch (p) {
                var m = p;
              }
              Reflect.construct(t, [], y);
            } else {
              try {
                y.call();
              } catch (p) {
                m = p;
              }
              t.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (p) {
              m = p;
            }
            (y = t()) &&
              typeof y.catch == "function" &&
              y.catch(function () {});
          }
        } catch (p) {
          if (p && m && typeof p.stack == "string") return [p.stack, m.stack];
        }
        return [null, null];
      },
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name",
    );
    n &&
      n.configurable &&
      Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var u = a.DetermineComponentFrameRoot(),
      i = u[0],
      c = u[1];
    if (i && c) {
      var s = i.split(`
`),
        f = c.split(`
`);
      for (
        n = a = 0;
        a < s.length && !s[a].includes("DetermineComponentFrameRoot");
      )
        a++;
      for (; n < f.length && !f[n].includes("DetermineComponentFrameRoot"); )
        n++;
      if (a === s.length || n === f.length)
        for (
          a = s.length - 1, n = f.length - 1;
          1 <= a && 0 <= n && s[a] !== f[n];
        )
          n--;
      for (; 1 <= a && 0 <= n; a--, n--)
        if (s[a] !== f[n]) {
          if (a !== 1 || n !== 1)
            do
              if ((a--, n--, 0 > n || s[a] !== f[n])) {
                var d =
                  `
` + s[a].replace(" at new ", " at ");
                return (
                  t.displayName &&
                    d.includes("<anonymous>") &&
                    (d = d.replace("<anonymous>", t.displayName)),
                  d
                );
              }
            while (1 <= a && 0 <= n);
          break;
        }
    }
  } finally {
    ((Ui = !1), (Error.prepareStackTrace = l));
  }
  return (l = t ? t.displayName || t.name : "") ? kl(l) : "";
}
function X0(t) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return kl(t.type);
    case 16:
      return kl("Lazy");
    case 13:
      return kl("Suspense");
    case 19:
      return kl("SuspenseList");
    case 0:
    case 15:
      return xi(t.type, !1);
    case 11:
      return xi(t.type.render, !1);
    case 1:
      return xi(t.type, !0);
    case 31:
      return kl("Activity");
    default:
      return "";
  }
}
function jf(t) {
  try {
    var e = "";
    do ((e += X0(t)), (t = t.return));
    while (t);
    return e;
  } catch (l) {
    return (
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack
    );
  }
}
function ae(t) {
  switch (typeof t) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function Io(t) {
  var e = t.type;
  return (
    (t = t.nodeName) &&
    t.toLowerCase() === "input" &&
    (e === "checkbox" || e === "radio")
  );
}
function G0(t) {
  var e = Io(t) ? "checked" : "value",
    l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
    a = "" + t[e];
  if (
    !t.hasOwnProperty(e) &&
    typeof l < "u" &&
    typeof l.get == "function" &&
    typeof l.set == "function"
  ) {
    var n = l.get,
      u = l.set;
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        get: function () {
          return n.call(this);
        },
        set: function (i) {
          ((a = "" + i), u.call(this, i));
        },
      }),
      Object.defineProperty(t, e, { enumerable: l.enumerable }),
      {
        getValue: function () {
          return a;
        },
        setValue: function (i) {
          a = "" + i;
        },
        stopTracking: function () {
          ((t._valueTracker = null), delete t[e]);
        },
      }
    );
  }
}
function zu(t) {
  t._valueTracker || (t._valueTracker = G0(t));
}
function td(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var l = e.getValue(),
    a = "";
  return (
    t && (a = Io(t) ? (t.checked ? "true" : "false") : t.value),
    (t = a),
    t !== l ? (e.setValue(t), !0) : !1
  );
}
function Uu(t) {
  if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u"))
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var Q0 = /[\n"\\]/g;
function ie(t) {
  return t.replace(Q0, function (e) {
    return "\\" + e.charCodeAt(0).toString(16) + " ";
  });
}
function Oc(t, e, l, a, n, u, i, c) {
  ((t.name = ""),
    i != null &&
    typeof i != "function" &&
    typeof i != "symbol" &&
    typeof i != "boolean"
      ? (t.type = i)
      : t.removeAttribute("type"),
    e != null
      ? i === "number"
        ? ((e === 0 && t.value === "") || t.value != e) &&
          (t.value = "" + ae(e))
        : t.value !== "" + ae(e) && (t.value = "" + ae(e))
      : (i !== "submit" && i !== "reset") || t.removeAttribute("value"),
    e != null
      ? Tc(t, i, ae(e))
      : l != null
        ? Tc(t, i, ae(l))
        : a != null && t.removeAttribute("value"),
    n == null && u != null && (t.defaultChecked = !!u),
    n != null &&
      (t.checked = n && typeof n != "function" && typeof n != "symbol"),
    c != null &&
    typeof c != "function" &&
    typeof c != "symbol" &&
    typeof c != "boolean"
      ? (t.name = "" + ae(c))
      : t.removeAttribute("name"));
}
function ed(t, e, l, a, n, u, i, c) {
  if (
    (u != null &&
      typeof u != "function" &&
      typeof u != "symbol" &&
      typeof u != "boolean" &&
      (t.type = u),
    e != null || l != null)
  ) {
    if (!((u !== "submit" && u !== "reset") || e != null)) return;
    ((l = l != null ? "" + ae(l) : ""),
      (e = e != null ? "" + ae(e) : l),
      c || e === t.value || (t.value = e),
      (t.defaultValue = e));
  }
  ((a = a ?? n),
    (a = typeof a != "function" && typeof a != "symbol" && !!a),
    (t.checked = c ? t.checked : !!a),
    (t.defaultChecked = !!a),
    i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean" &&
      (t.name = i));
}
function Tc(t, e, l) {
  (e === "number" && Uu(t.ownerDocument) === t) ||
    t.defaultValue === "" + l ||
    (t.defaultValue = "" + l);
}
function ca(t, e, l, a) {
  if (((t = t.options), e)) {
    e = {};
    for (var n = 0; n < l.length; n++) e["$" + l[n]] = !0;
    for (l = 0; l < t.length; l++)
      ((n = e.hasOwnProperty("$" + t[l].value)),
        t[l].selected !== n && (t[l].selected = n),
        n && a && (t[l].defaultSelected = !0));
  } else {
    for (l = "" + ae(l), e = null, n = 0; n < t.length; n++) {
      if (t[n].value === l) {
        ((t[n].selected = !0), a && (t[n].defaultSelected = !0));
        return;
      }
      e !== null || t[n].disabled || (e = t[n]);
    }
    e !== null && (e.selected = !0);
  }
}
function ld(t, e, l) {
  if (
    e != null &&
    ((e = "" + ae(e)), e !== t.value && (t.value = e), l == null)
  ) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = l != null ? "" + ae(l) : "";
}
function ad(t, e, l, a) {
  if (e == null) {
    if (a != null) {
      if (l != null) throw Error(E(92));
      if (Ja(a)) {
        if (1 < a.length) throw Error(E(93));
        a = a[0];
      }
      l = a;
    }
    (l == null && (l = ""), (e = l));
  }
  ((l = ae(e)),
    (t.defaultValue = l),
    (a = t.textContent),
    a === l && a !== "" && a !== null && (t.value = a));
}
function pa(t, e) {
  if (e) {
    var l = t.firstChild;
    if (l && l === t.lastChild && l.nodeType === 3) {
      l.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var V0 = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function Yf(t, e, l) {
  var a = e.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === ""
    ? a
      ? t.setProperty(e, "")
      : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
    : a
      ? t.setProperty(e, l)
      : typeof l != "number" || l === 0 || V0.has(e)
        ? e === "float"
          ? (t.cssFloat = l)
          : (t[e] = ("" + l).trim())
        : (t[e] = l + "px");
}
function nd(t, e, l) {
  if (e != null && typeof e != "object") throw Error(E(62));
  if (((t = t.style), l != null)) {
    for (var a in l)
      !l.hasOwnProperty(a) ||
        (e != null && e.hasOwnProperty(a)) ||
        (a.indexOf("--") === 0
          ? t.setProperty(a, "")
          : a === "float"
            ? (t.cssFloat = "")
            : (t[a] = ""));
    for (var n in e)
      ((a = e[n]), e.hasOwnProperty(n) && l[n] !== a && Yf(t, n, a));
  } else for (var u in e) e.hasOwnProperty(u) && Yf(t, u, e[u]);
}
function Ds(t) {
  if (t.indexOf("-") === -1) return !1;
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var k0 = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  Z0 =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function du(t) {
  return Z0.test("" + t)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : t;
}
var Rc = null;
function Ms(t) {
  return (
    (t = t.target || t.srcElement || window),
    t.correspondingUseElement && (t = t.correspondingUseElement),
    t.nodeType === 3 ? t.parentNode : t
  );
}
var Wl = null,
  sa = null;
function Xf(t) {
  var e = Na(t);
  if (e && (t = e.stateNode)) {
    var l = t[Gt] || null;
    t: switch (((t = e.stateNode), e.type)) {
      case "input":
        if (
          (Oc(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
          ),
          (e = l.name),
          l.type === "radio" && e != null)
        ) {
          for (l = t; l.parentNode; ) l = l.parentNode;
          for (
            l = l.querySelectorAll(
              'input[name="' + ie("" + e) + '"][type="radio"]',
            ),
              e = 0;
            e < l.length;
            e++
          ) {
            var a = l[e];
            if (a !== t && a.form === t.form) {
              var n = a[Gt] || null;
              if (!n) throw Error(E(90));
              Oc(
                a,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              );
            }
          }
          for (e = 0; e < l.length; e++)
            ((a = l[e]), a.form === t.form && td(a));
        }
        break t;
      case "textarea":
        ld(t, l.value, l.defaultValue);
        break t;
      case "select":
        ((e = l.value), e != null && ca(t, !!l.multiple, e, !1));
    }
  }
}
var wi = !1;
function ud(t, e, l) {
  if (wi) return t(e, l);
  wi = !0;
  try {
    var a = t(e);
    return a;
  } finally {
    if (
      ((wi = !1),
      (Wl !== null || sa !== null) &&
        (bi(), Wl && ((e = Wl), (t = sa), (sa = Wl = null), Xf(e), t)))
    )
      for (e = 0; e < t.length; e++) Xf(t[e]);
  }
}
function hn(t, e) {
  var l = t.stateNode;
  if (l === null) return null;
  var a = l[Gt] || null;
  if (a === null) return null;
  l = a[e];
  t: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((a = !a.disabled) ||
        ((t = t.type),
        (a = !(
          t === "button" ||
          t === "input" ||
          t === "select" ||
          t === "textarea"
        ))),
        (t = !a));
      break t;
    default:
      t = !1;
  }
  if (t) return null;
  if (l && typeof l != "function") throw Error(E(231, e, typeof l));
  return l;
}
var qe = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  _c = !1;
if (qe)
  try {
    var La = {};
    (Object.defineProperty(La, "passive", {
      get: function () {
        _c = !0;
      },
    }),
      window.addEventListener("test", La, La),
      window.removeEventListener("test", La, La));
  } catch {
    _c = !1;
  }
var Ie = null,
  Ns = null,
  mu = null;
function id() {
  if (mu) return mu;
  var t,
    e = Ns,
    l = e.length,
    a,
    n = "value" in Ie ? Ie.value : Ie.textContent,
    u = n.length;
  for (t = 0; t < l && e[t] === n[t]; t++);
  var i = l - t;
  for (a = 1; a <= i && e[l - a] === n[u - a]; a++);
  return (mu = n.slice(t, 1 < a ? 1 - a : void 0));
}
function hu(t) {
  var e = t.keyCode;
  return (
    "charCode" in t
      ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
      : (t = e),
    t === 10 && (t = 13),
    32 <= t || t === 13 ? t : 0
  );
}
function tu() {
  return !0;
}
function Gf() {
  return !1;
}
function Qt(t) {
  function e(l, a, n, u, i) {
    ((this._reactName = l),
      (this._targetInst = n),
      (this.type = a),
      (this.nativeEvent = u),
      (this.target = i),
      (this.currentTarget = null));
    for (var c in t)
      t.hasOwnProperty(c) && ((l = t[c]), (this[c] = l ? l(u) : u[c]));
    return (
      (this.isDefaultPrevented = (
        u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
      )
        ? tu
        : Gf),
      (this.isPropagationStopped = Gf),
      this
    );
  }
  return (
    at(e.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l &&
          (l.preventDefault
            ? l.preventDefault()
            : typeof l.returnValue != "unknown" && (l.returnValue = !1),
          (this.isDefaultPrevented = tu));
      },
      stopPropagation: function () {
        var l = this.nativeEvent;
        l &&
          (l.stopPropagation
            ? l.stopPropagation()
            : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
          (this.isPropagationStopped = tu));
      },
      persist: function () {},
      isPersistent: tu,
    }),
    e
  );
}
var Ll = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ri = Qt(Ll),
  xn = at({}, Ll, { view: 0, detail: 0 }),
  K0 = Qt(xn),
  Bi,
  Hi,
  ja,
  oi = at({}, xn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Cs,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      return t.relatedTarget === void 0
        ? t.fromElement === t.srcElement
          ? t.toElement
          : t.fromElement
        : t.relatedTarget;
    },
    movementX: function (t) {
      return "movementX" in t
        ? t.movementX
        : (t !== ja &&
            (ja && t.type === "mousemove"
              ? ((Bi = t.screenX - ja.screenX), (Hi = t.screenY - ja.screenY))
              : (Hi = Bi = 0),
            (ja = t)),
          Bi);
    },
    movementY: function (t) {
      return "movementY" in t ? t.movementY : Hi;
    },
  }),
  Qf = Qt(oi),
  J0 = at({}, oi, { dataTransfer: 0 }),
  $0 = Qt(J0),
  F0 = at({}, xn, { relatedTarget: 0 }),
  qi = Qt(F0),
  W0 = at({}, Ll, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  P0 = Qt(W0),
  I0 = at({}, Ll, {
    clipboardData: function (t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    },
  }),
  ty = Qt(I0),
  ey = at({}, Ll, { data: 0 }),
  Vf = Qt(ey),
  ly = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  ay = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  ny = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function uy(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = ny[t]) ? !!e[t] : !1;
}
function Cs() {
  return uy;
}
var iy = at({}, xn, {
    key: function (t) {
      if (t.key) {
        var e = ly[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress"
        ? ((t = hu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
        : t.type === "keydown" || t.type === "keyup"
          ? ay[t.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Cs,
    charCode: function (t) {
      return t.type === "keypress" ? hu(t) : 0;
    },
    keyCode: function (t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function (t) {
      return t.type === "keypress"
        ? hu(t)
        : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
    },
  }),
  cy = Qt(iy),
  sy = at({}, oi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  kf = Qt(sy),
  fy = at({}, xn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Cs,
  }),
  ry = Qt(fy),
  oy = at({}, Ll, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  dy = Qt(oy),
  my = at({}, oi, {
    deltaX: function (t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function (t) {
      return "deltaY" in t
        ? t.deltaY
        : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
            ? -t.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  hy = Qt(my),
  yy = at({}, Ll, { newState: 0, oldState: 0 }),
  py = Qt(yy),
  gy = [9, 13, 27, 32],
  zs = qe && "CompositionEvent" in window,
  Pa = null;
qe && "documentMode" in document && (Pa = document.documentMode);
var vy = qe && "TextEvent" in window && !Pa,
  cd = qe && (!zs || (Pa && 8 < Pa && 11 >= Pa)),
  Zf = " ",
  Kf = !1;
function sd(t, e) {
  switch (t) {
    case "keyup":
      return gy.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function fd(t) {
  return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
}
var Pl = !1;
function by(t, e) {
  switch (t) {
    case "compositionend":
      return fd(e);
    case "keypress":
      return e.which !== 32 ? null : ((Kf = !0), Zf);
    case "textInput":
      return ((t = e.data), t === Zf && Kf ? null : t);
    default:
      return null;
  }
}
function Sy(t, e) {
  if (Pl)
    return t === "compositionend" || (!zs && sd(t, e))
      ? ((t = id()), (mu = Ns = Ie = null), (Pl = !1), t)
      : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return cd && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Ey = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Jf(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Ey[t.type] : e === "textarea";
}
function rd(t, e, l, a) {
  (Wl ? (sa ? sa.push(a) : (sa = [a])) : (Wl = a),
    (e = Fu(e, "onChange")),
    0 < e.length &&
      ((l = new ri("onChange", "change", null, l, a)),
      t.push({ event: l, listeners: e })));
}
var Ia = null,
  yn = null;
function Ay(t) {
  lh(t, 0);
}
function di(t) {
  var e = $a(t);
  if (td(e)) return t;
}
function $f(t, e) {
  if (t === "change") return e;
}
var od = !1;
if (qe) {
  var Li;
  if (qe) {
    var ji = "oninput" in document;
    if (!ji) {
      var Ff = document.createElement("div");
      (Ff.setAttribute("oninput", "return;"),
        (ji = typeof Ff.oninput == "function"));
    }
    Li = ji;
  } else Li = !1;
  od = Li && (!document.documentMode || 9 < document.documentMode);
}
function Wf() {
  Ia && (Ia.detachEvent("onpropertychange", dd), (yn = Ia = null));
}
function dd(t) {
  if (t.propertyName === "value" && di(yn)) {
    var e = [];
    (rd(e, yn, t, Ms(t)), ud(Ay, e));
  }
}
function Oy(t, e, l) {
  t === "focusin"
    ? (Wf(), (Ia = e), (yn = l), Ia.attachEvent("onpropertychange", dd))
    : t === "focusout" && Wf();
}
function Ty(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return di(yn);
}
function Ry(t, e) {
  if (t === "click") return di(e);
}
function _y(t, e) {
  if (t === "input" || t === "change") return di(e);
}
function Dy(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var te = typeof Object.is == "function" ? Object.is : Dy;
function pn(t, e) {
  if (te(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var l = Object.keys(t),
    a = Object.keys(e);
  if (l.length !== a.length) return !1;
  for (a = 0; a < l.length; a++) {
    var n = l[a];
    if (!Ec.call(e, n) || !te(t[n], e[n])) return !1;
  }
  return !0;
}
function Pf(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function If(t, e) {
  var l = Pf(t);
  t = 0;
  for (var a; l; ) {
    if (l.nodeType === 3) {
      if (((a = t + l.textContent.length), t <= e && a >= e))
        return { node: l, offset: e - t };
      t = a;
    }
    t: {
      for (; l; ) {
        if (l.nextSibling) {
          l = l.nextSibling;
          break t;
        }
        l = l.parentNode;
      }
      l = void 0;
    }
    l = Pf(l);
  }
}
function md(t, e) {
  return t && e
    ? t === e
      ? !0
      : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
          ? md(t, e.parentNode)
          : "contains" in t
            ? t.contains(e)
            : t.compareDocumentPosition
              ? !!(t.compareDocumentPosition(e) & 16)
              : !1
    : !1;
}
function hd(t) {
  t =
    t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
      ? t.ownerDocument.defaultView
      : window;
  for (var e = Uu(t.document); e instanceof t.HTMLIFrameElement; ) {
    try {
      var l = typeof e.contentWindow.location.href == "string";
    } catch {
      l = !1;
    }
    if (l) t = e.contentWindow;
    else break;
    e = Uu(t.document);
  }
  return e;
}
function Us(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return (
    e &&
    ((e === "input" &&
      (t.type === "text" ||
        t.type === "search" ||
        t.type === "tel" ||
        t.type === "url" ||
        t.type === "password")) ||
      e === "textarea" ||
      t.contentEditable === "true")
  );
}
var My = qe && "documentMode" in document && 11 >= document.documentMode,
  Il = null,
  Dc = null,
  tn = null,
  Mc = !1;
function tr(t, e, l) {
  var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  Mc ||
    Il == null ||
    Il !== Uu(a) ||
    ((a = Il),
    "selectionStart" in a && Us(a)
      ? (a = { start: a.selectionStart, end: a.selectionEnd })
      : ((a = (
          (a.ownerDocument && a.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (a = {
          anchorNode: a.anchorNode,
          anchorOffset: a.anchorOffset,
          focusNode: a.focusNode,
          focusOffset: a.focusOffset,
        })),
    (tn && pn(tn, a)) ||
      ((tn = a),
      (a = Fu(Dc, "onSelect")),
      0 < a.length &&
        ((e = new ri("onSelect", "select", null, e, l)),
        t.push({ event: e, listeners: a }),
        (e.target = Il))));
}
function gl(t, e) {
  var l = {};
  return (
    (l[t.toLowerCase()] = e.toLowerCase()),
    (l["Webkit" + t] = "webkit" + e),
    (l["Moz" + t] = "moz" + e),
    l
  );
}
var ta = {
    animationend: gl("Animation", "AnimationEnd"),
    animationiteration: gl("Animation", "AnimationIteration"),
    animationstart: gl("Animation", "AnimationStart"),
    transitionrun: gl("Transition", "TransitionRun"),
    transitionstart: gl("Transition", "TransitionStart"),
    transitioncancel: gl("Transition", "TransitionCancel"),
    transitionend: gl("Transition", "TransitionEnd"),
  },
  Yi = {},
  yd = {};
qe &&
  ((yd = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete ta.animationend.animation,
    delete ta.animationiteration.animation,
    delete ta.animationstart.animation),
  "TransitionEvent" in window || delete ta.transitionend.transition);
function jl(t) {
  if (Yi[t]) return Yi[t];
  if (!ta[t]) return t;
  var e = ta[t],
    l;
  for (l in e) if (e.hasOwnProperty(l) && l in yd) return (Yi[t] = e[l]);
  return t;
}
var pd = jl("animationend"),
  gd = jl("animationiteration"),
  vd = jl("animationstart"),
  Ny = jl("transitionrun"),
  Cy = jl("transitionstart"),
  zy = jl("transitioncancel"),
  bd = jl("transitionend"),
  Sd = new Map(),
  Nc =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
Nc.push("scrollEnd");
function me(t, e) {
  (Sd.set(t, e), ql(e, [t]));
}
var er = new WeakMap();
function ce(t, e) {
  if (typeof t == "object" && t !== null) {
    var l = er.get(t);
    return l !== void 0
      ? l
      : ((e = { value: t, source: e, stack: jf(e) }), er.set(t, e), e);
  }
  return { value: t, source: e, stack: jf(e) };
}
var le = [],
  ea = 0,
  xs = 0;
function mi() {
  for (var t = ea, e = (xs = ea = 0); e < t; ) {
    var l = le[e];
    le[e++] = null;
    var a = le[e];
    le[e++] = null;
    var n = le[e];
    le[e++] = null;
    var u = le[e];
    if (((le[e++] = null), a !== null && n !== null)) {
      var i = a.pending;
      (i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
        (a.pending = n));
    }
    u !== 0 && Ed(l, n, u);
  }
}
function hi(t, e, l, a) {
  ((le[ea++] = t),
    (le[ea++] = e),
    (le[ea++] = l),
    (le[ea++] = a),
    (xs |= a),
    (t.lanes |= a),
    (t = t.alternate),
    t !== null && (t.lanes |= a));
}
function ws(t, e, l, a) {
  return (hi(t, e, l, a), xu(t));
}
function Ca(t, e) {
  return (hi(t, null, null, e), xu(t));
}
function Ed(t, e, l) {
  t.lanes |= l;
  var a = t.alternate;
  a !== null && (a.lanes |= l);
  for (var n = !1, u = t.return; u !== null; )
    ((u.childLanes |= l),
      (a = u.alternate),
      a !== null && (a.childLanes |= l),
      u.tag === 22 &&
        ((t = u.stateNode), t === null || t._visibility & 1 || (n = !0)),
      (t = u),
      (u = u.return));
  return t.tag === 3
    ? ((u = t.stateNode),
      n &&
        e !== null &&
        ((n = 31 - Wt(l)),
        (t = u.hiddenUpdates),
        (a = t[n]),
        a === null ? (t[n] = [e]) : a.push(e),
        (e.lane = l | 536870912)),
      u)
    : null;
}
function xu(t) {
  if (50 < on) throw ((on = 0), (Fc = null), Error(E(185)));
  for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
  return t.tag === 3 ? t.stateNode : null;
}
var la = {};
function Uy(t, e, l, a) {
  ((this.tag = t),
    (this.key = l),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = e),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = a),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function $t(t, e, l, a) {
  return new Uy(t, e, l, a);
}
function Bs(t) {
  return ((t = t.prototype), !(!t || !t.isReactComponent));
}
function Be(t, e) {
  var l = t.alternate;
  return (
    l === null
      ? ((l = $t(t.tag, e, t.key, t.mode)),
        (l.elementType = t.elementType),
        (l.type = t.type),
        (l.stateNode = t.stateNode),
        (l.alternate = t),
        (t.alternate = l))
      : ((l.pendingProps = e),
        (l.type = t.type),
        (l.flags = 0),
        (l.subtreeFlags = 0),
        (l.deletions = null)),
    (l.flags = t.flags & 65011712),
    (l.childLanes = t.childLanes),
    (l.lanes = t.lanes),
    (l.child = t.child),
    (l.memoizedProps = t.memoizedProps),
    (l.memoizedState = t.memoizedState),
    (l.updateQueue = t.updateQueue),
    (e = t.dependencies),
    (l.dependencies =
      e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
    (l.sibling = t.sibling),
    (l.index = t.index),
    (l.ref = t.ref),
    (l.refCleanup = t.refCleanup),
    l
  );
}
function Ad(t, e) {
  t.flags &= 65011714;
  var l = t.alternate;
  return (
    l === null
      ? ((t.childLanes = 0),
        (t.lanes = e),
        (t.child = null),
        (t.subtreeFlags = 0),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.dependencies = null),
        (t.stateNode = null))
      : ((t.childLanes = l.childLanes),
        (t.lanes = l.lanes),
        (t.child = l.child),
        (t.subtreeFlags = 0),
        (t.deletions = null),
        (t.memoizedProps = l.memoizedProps),
        (t.memoizedState = l.memoizedState),
        (t.updateQueue = l.updateQueue),
        (t.type = l.type),
        (e = l.dependencies),
        (t.dependencies =
          e === null
            ? null
            : { lanes: e.lanes, firstContext: e.firstContext })),
    t
  );
}
function yu(t, e, l, a, n, u) {
  var i = 0;
  if (((a = t), typeof t == "function")) Bs(t) && (i = 1);
  else if (typeof t == "string")
    i = w1(t, l, ve.current)
      ? 26
      : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
  else
    t: switch (t) {
      case gc:
        return ((t = $t(31, l, e, n)), (t.elementType = gc), (t.lanes = u), t);
      case Jl:
        return Tl(l.children, n, u, e);
      case Xo:
        ((i = 8), (n |= 24));
        break;
      case hc:
        return (
          (t = $t(12, l, e, n | 2)),
          (t.elementType = hc),
          (t.lanes = u),
          t
        );
      case yc:
        return ((t = $t(13, l, e, n)), (t.elementType = yc), (t.lanes = u), t);
      case pc:
        return ((t = $t(19, l, e, n)), (t.elementType = pc), (t.lanes = u), t);
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case A0:
            case Ce:
              i = 10;
              break t;
            case Go:
              i = 9;
              break t;
            case Es:
              i = 11;
              break t;
            case As:
              i = 14;
              break t;
            case Ze:
              ((i = 16), (a = null));
              break t;
          }
        ((i = 29),
          (l = Error(E(130, t === null ? "null" : typeof t, ""))),
          (a = null));
    }
  return (
    (e = $t(i, l, e, n)),
    (e.elementType = t),
    (e.type = a),
    (e.lanes = u),
    e
  );
}
function Tl(t, e, l, a) {
  return ((t = $t(7, t, a, e)), (t.lanes = l), t);
}
function Xi(t, e, l) {
  return ((t = $t(6, t, null, e)), (t.lanes = l), t);
}
function Gi(t, e, l) {
  return (
    (e = $t(4, t.children !== null ? t.children : [], t.key, e)),
    (e.lanes = l),
    (e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation,
    }),
    e
  );
}
var aa = [],
  na = 0,
  wu = null,
  Bu = 0,
  ne = [],
  ue = 0,
  Rl = null,
  ze = 1,
  Ue = "";
function bl(t, e) {
  ((aa[na++] = Bu), (aa[na++] = wu), (wu = t), (Bu = e));
}
function Od(t, e, l) {
  ((ne[ue++] = ze), (ne[ue++] = Ue), (ne[ue++] = Rl), (Rl = t));
  var a = ze;
  t = Ue;
  var n = 32 - Wt(a) - 1;
  ((a &= ~(1 << n)), (l += 1));
  var u = 32 - Wt(e) + n;
  if (30 < u) {
    var i = n - (n % 5);
    ((u = (a & ((1 << i) - 1)).toString(32)),
      (a >>= i),
      (n -= i),
      (ze = (1 << (32 - Wt(e) + n)) | (l << n) | a),
      (Ue = u + t));
  } else ((ze = (1 << u) | (l << n) | a), (Ue = t));
}
function Hs(t) {
  t.return !== null && (bl(t, 1), Od(t, 1, 0));
}
function qs(t) {
  for (; t === wu; )
    ((wu = aa[--na]), (aa[na] = null), (Bu = aa[--na]), (aa[na] = null));
  for (; t === Rl; )
    ((Rl = ne[--ue]),
      (ne[ue] = null),
      (Ue = ne[--ue]),
      (ne[ue] = null),
      (ze = ne[--ue]),
      (ne[ue] = null));
}
var wt = null,
  ft = null,
  K = !1,
  _l = null,
  pe = !1,
  Cc = Error(E(519));
function zl(t) {
  var e = Error(E(418, ""));
  throw (gn(ce(e, t)), Cc);
}
function lr(t) {
  var e = t.stateNode,
    l = t.type,
    a = t.memoizedProps;
  switch (((e[zt] = t), (e[Gt] = a), l)) {
    case "dialog":
      (G("cancel", e), G("close", e));
      break;
    case "iframe":
    case "object":
    case "embed":
      G("load", e);
      break;
    case "video":
    case "audio":
      for (l = 0; l < Sn.length; l++) G(Sn[l], e);
      break;
    case "source":
      G("error", e);
      break;
    case "img":
    case "image":
    case "link":
      (G("error", e), G("load", e));
      break;
    case "details":
      G("toggle", e);
      break;
    case "input":
      (G("invalid", e),
        ed(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0,
        ),
        zu(e));
      break;
    case "select":
      G("invalid", e);
      break;
    case "textarea":
      (G("invalid", e), ad(e, a.value, a.defaultValue, a.children), zu(e));
  }
  ((l = a.children),
    (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
    e.textContent === "" + l ||
    a.suppressHydrationWarning === !0 ||
    nh(e.textContent, l)
      ? (a.popover != null && (G("beforetoggle", e), G("toggle", e)),
        a.onScroll != null && G("scroll", e),
        a.onScrollEnd != null && G("scrollend", e),
        a.onClick != null && (e.onclick = Ai),
        (e = !0))
      : (e = !1),
    e || zl(t));
}
function ar(t) {
  for (wt = t.return; wt; )
    switch (wt.tag) {
      case 5:
      case 13:
        pe = !1;
        return;
      case 27:
      case 3:
        pe = !0;
        return;
      default:
        wt = wt.return;
    }
}
function Ya(t) {
  if (t !== wt) return !1;
  if (!K) return (ar(t), (K = !0), !1);
  var e = t.tag,
    l;
  if (
    ((l = e !== 3 && e !== 27) &&
      ((l = e === 5) &&
        ((l = t.type),
        (l = !(l !== "form" && l !== "button") || ls(t.type, t.memoizedProps))),
      (l = !l)),
    l && ft && zl(t),
    ar(t),
    e === 13)
  ) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
      throw Error(E(317));
    t: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8)
          if (((l = t.data), l === "/$")) {
            if (e === 0) {
              ft = de(t.nextSibling);
              break t;
            }
            e--;
          } else (l !== "$" && l !== "$!" && l !== "$?") || e++;
        t = t.nextSibling;
      }
      ft = null;
    }
  } else
    e === 27
      ? ((e = ft), hl(t.type) ? ((t = us), (us = null), (ft = t)) : (ft = e))
      : (ft = wt ? de(t.stateNode.nextSibling) : null);
  return !0;
}
function wn() {
  ((ft = wt = null), (K = !1));
}
function nr() {
  var t = _l;
  return (
    t !== null && (Yt === null ? (Yt = t) : Yt.push.apply(Yt, t), (_l = null)),
    t
  );
}
function gn(t) {
  _l === null ? (_l = [t]) : _l.push(t);
}
var zc = Ee(null),
  Yl = null,
  xe = null;
function Je(t, e, l) {
  (it(zc, e._currentValue), (e._currentValue = l));
}
function He(t) {
  ((t._currentValue = zc.current), Rt(zc));
}
function Uc(t, e, l) {
  for (; t !== null; ) {
    var a = t.alternate;
    if (
      ((t.childLanes & e) !== e
        ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
        : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
      t === l)
    )
      break;
    t = t.return;
  }
}
function xc(t, e, l, a) {
  var n = t.child;
  for (n !== null && (n.return = t); n !== null; ) {
    var u = n.dependencies;
    if (u !== null) {
      var i = n.child;
      u = u.firstContext;
      t: for (; u !== null; ) {
        var c = u;
        u = n;
        for (var s = 0; s < e.length; s++)
          if (c.context === e[s]) {
            ((u.lanes |= l),
              (c = u.alternate),
              c !== null && (c.lanes |= l),
              Uc(u.return, l, t),
              a || (i = null));
            break t;
          }
        u = c.next;
      }
    } else if (n.tag === 18) {
      if (((i = n.return), i === null)) throw Error(E(341));
      ((i.lanes |= l),
        (u = i.alternate),
        u !== null && (u.lanes |= l),
        Uc(i, l, t),
        (i = null));
    } else i = n.child;
    if (i !== null) i.return = n;
    else
      for (i = n; i !== null; ) {
        if (i === t) {
          i = null;
          break;
        }
        if (((n = i.sibling), n !== null)) {
          ((n.return = i.return), (i = n));
          break;
        }
        i = i.return;
      }
    n = i;
  }
}
function Bn(t, e, l, a) {
  t = null;
  for (var n = e, u = !1; n !== null; ) {
    if (!u) {
      if (n.flags & 524288) u = !0;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var i = n.alternate;
      if (i === null) throw Error(E(387));
      if (((i = i.memoizedProps), i !== null)) {
        var c = n.type;
        te(n.pendingProps.value, i.value) ||
          (t !== null ? t.push(c) : (t = [c]));
      }
    } else if (n === Du.current) {
      if (((i = n.alternate), i === null)) throw Error(E(387));
      i.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
        (t !== null ? t.push(On) : (t = [On]));
    }
    n = n.return;
  }
  (t !== null && xc(e, t, l, a), (e.flags |= 262144));
}
function Hu(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!te(t.context._currentValue, t.memoizedValue)) return !0;
    t = t.next;
  }
  return !1;
}
function Ul(t) {
  ((Yl = t),
    (xe = null),
    (t = t.dependencies),
    t !== null && (t.firstContext = null));
}
function Ut(t) {
  return Td(Yl, t);
}
function eu(t, e) {
  return (Yl === null && Ul(t), Td(t, e));
}
function Td(t, e) {
  var l = e._currentValue;
  if (((e = { context: e, memoizedValue: l, next: null }), xe === null)) {
    if (t === null) throw Error(E(308));
    ((xe = e),
      (t.dependencies = { lanes: 0, firstContext: e }),
      (t.flags |= 524288));
  } else xe = xe.next = e;
  return l;
}
var xy =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var t = [],
            e = (this.signal = {
              aborted: !1,
              addEventListener: function (l, a) {
                t.push(a);
              },
            });
          this.abort = function () {
            ((e.aborted = !0),
              t.forEach(function (l) {
                return l();
              }));
          };
        },
  wy = bt.unstable_scheduleCallback,
  By = bt.unstable_NormalPriority,
  gt = {
    $$typeof: Ce,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Ls() {
  return { controller: new xy(), data: new Map(), refCount: 0 };
}
function Hn(t) {
  (t.refCount--,
    t.refCount === 0 &&
      wy(By, function () {
        t.controller.abort();
      }));
}
var en = null,
  wc = 0,
  ga = 0,
  fa = null;
function Hy(t, e) {
  if (en === null) {
    var l = (en = []);
    ((wc = 0),
      (ga = sf()),
      (fa = {
        status: "pending",
        value: void 0,
        then: function (a) {
          l.push(a);
        },
      }));
  }
  return (wc++, e.then(ur, ur), e);
}
function ur() {
  if (--wc === 0 && en !== null) {
    fa !== null && (fa.status = "fulfilled");
    var t = en;
    ((en = null), (ga = 0), (fa = null));
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function qy(t, e) {
  var l = [],
    a = {
      status: "pending",
      value: null,
      reason: null,
      then: function (n) {
        l.push(n);
      },
    };
  return (
    t.then(
      function () {
        ((a.status = "fulfilled"), (a.value = e));
        for (var n = 0; n < l.length; n++) (0, l[n])(e);
      },
      function (n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      },
    ),
    a
  );
}
var ir = B.S;
B.S = function (t, e) {
  (typeof e == "object" &&
    e !== null &&
    typeof e.then == "function" &&
    Hy(t, e),
    ir !== null && ir(t, e));
};
var Dl = Ee(null);
function js() {
  var t = Dl.current;
  return t !== null ? t : lt.pooledCache;
}
function pu(t, e) {
  e === null ? it(Dl, Dl.current) : it(Dl, e.pool);
}
function Rd() {
  var t = js();
  return t === null ? null : { parent: gt._currentValue, pool: t };
}
var qn = Error(E(460)),
  _d = Error(E(474)),
  yi = Error(E(542)),
  Bc = { then: function () {} };
function cr(t) {
  return ((t = t.status), t === "fulfilled" || t === "rejected");
}
function lu() {}
function Dd(t, e, l) {
  switch (
    ((l = t[l]),
    l === void 0 ? t.push(e) : l !== e && (e.then(lu, lu), (e = l)),
    e.status)
  ) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw ((t = e.reason), fr(t), t);
    default:
      if (typeof e.status == "string") e.then(lu, lu);
      else {
        if (((t = lt), t !== null && 100 < t.shellSuspendCounter))
          throw Error(E(482));
        ((t = e),
          (t.status = "pending"),
          t.then(
            function (a) {
              if (e.status === "pending") {
                var n = e;
                ((n.status = "fulfilled"), (n.value = a));
              }
            },
            function (a) {
              if (e.status === "pending") {
                var n = e;
                ((n.status = "rejected"), (n.reason = a));
              }
            },
          ));
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw ((t = e.reason), fr(t), t);
      }
      throw ((ln = e), qn);
  }
}
var ln = null;
function sr() {
  if (ln === null) throw Error(E(459));
  var t = ln;
  return ((ln = null), t);
}
function fr(t) {
  if (t === qn || t === yi) throw Error(E(483));
}
var Ke = !1;
function Ys(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function Hc(t, e) {
  ((t = t.updateQueue),
    e.updateQueue === t &&
      (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null,
      }));
}
function al(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function nl(t, e, l) {
  var a = t.updateQueue;
  if (a === null) return null;
  if (((a = a.shared), F & 2)) {
    var n = a.pending;
    return (
      n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
      (a.pending = e),
      (e = xu(t)),
      Ed(t, null, l),
      e
    );
  }
  return (hi(t, a, e, l), xu(t));
}
function an(t, e, l) {
  if (
    ((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))
  ) {
    var a = e.lanes;
    ((a &= t.pendingLanes), (l |= a), (e.lanes = l), $o(t, l));
  }
}
function Qi(t, e) {
  var l = t.updateQueue,
    a = t.alternate;
  if (a !== null && ((a = a.updateQueue), l === a)) {
    var n = null,
      u = null;
    if (((l = l.firstBaseUpdate), l !== null)) {
      do {
        var i = {
          lane: l.lane,
          tag: l.tag,
          payload: l.payload,
          callback: null,
          next: null,
        };
        (u === null ? (n = u = i) : (u = u.next = i), (l = l.next));
      } while (l !== null);
      u === null ? (n = u = e) : (u = u.next = e);
    } else n = u = e;
    ((l = {
      baseState: a.baseState,
      firstBaseUpdate: n,
      lastBaseUpdate: u,
      shared: a.shared,
      callbacks: a.callbacks,
    }),
      (t.updateQueue = l));
    return;
  }
  ((t = l.lastBaseUpdate),
    t === null ? (l.firstBaseUpdate = e) : (t.next = e),
    (l.lastBaseUpdate = e));
}
var qc = !1;
function nn() {
  if (qc) {
    var t = fa;
    if (t !== null) throw t;
  }
}
function un(t, e, l, a) {
  qc = !1;
  var n = t.updateQueue;
  Ke = !1;
  var u = n.firstBaseUpdate,
    i = n.lastBaseUpdate,
    c = n.shared.pending;
  if (c !== null) {
    n.shared.pending = null;
    var s = c,
      f = s.next;
    ((s.next = null), i === null ? (u = f) : (i.next = f), (i = s));
    var d = t.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (c = d.lastBaseUpdate),
      c !== i &&
        (c === null ? (d.firstBaseUpdate = f) : (c.next = f),
        (d.lastBaseUpdate = s)));
  }
  if (u !== null) {
    var y = n.baseState;
    ((i = 0), (d = f = s = null), (c = u));
    do {
      var m = c.lane & -536870913,
        p = m !== c.lane;
      if (p ? (V & m) === m : (a & m) === m) {
        (m !== 0 && m === ga && (qc = !0),
          d !== null &&
            (d = d.next =
              {
                lane: 0,
                tag: c.tag,
                payload: c.payload,
                callback: null,
                next: null,
              }));
        t: {
          var T = t,
            A = c;
          m = e;
          var R = l;
          switch (A.tag) {
            case 1:
              if (((T = A.payload), typeof T == "function")) {
                y = T.call(R, y, m);
                break t;
              }
              y = T;
              break t;
            case 3:
              T.flags = (T.flags & -65537) | 128;
            case 0:
              if (
                ((T = A.payload),
                (m = typeof T == "function" ? T.call(R, y, m) : T),
                m == null)
              )
                break t;
              y = at({}, y, m);
              break t;
            case 2:
              Ke = !0;
          }
        }
        ((m = c.callback),
          m !== null &&
            ((t.flags |= 64),
            p && (t.flags |= 8192),
            (p = n.callbacks),
            p === null ? (n.callbacks = [m]) : p.push(m)));
      } else
        ((p = {
          lane: m,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null,
        }),
          d === null ? ((f = d = p), (s = y)) : (d = d.next = p),
          (i |= m));
      if (((c = c.next), c === null)) {
        if (((c = n.shared.pending), c === null)) break;
        ((p = c),
          (c = p.next),
          (p.next = null),
          (n.lastBaseUpdate = p),
          (n.shared.pending = null));
      }
    } while (!0);
    (d === null && (s = y),
      (n.baseState = s),
      (n.firstBaseUpdate = f),
      (n.lastBaseUpdate = d),
      u === null && (n.shared.lanes = 0),
      (dl |= i),
      (t.lanes = i),
      (t.memoizedState = y));
  }
}
function Md(t, e) {
  if (typeof t != "function") throw Error(E(191, t));
  t.call(e);
}
function Nd(t, e) {
  var l = t.callbacks;
  if (l !== null)
    for (t.callbacks = null, t = 0; t < l.length; t++) Md(l[t], e);
}
var va = Ee(null),
  qu = Ee(0);
function rr(t, e) {
  ((t = Ye), it(qu, t), it(va, e), (Ye = t | e.baseLanes));
}
function Lc() {
  (it(qu, Ye), it(va, va.current));
}
function Xs() {
  ((Ye = qu.current), Rt(va), Rt(qu));
}
var rl = 0,
  Y = null,
  I = null,
  yt = null,
  Lu = !1,
  ra = !1,
  xl = !1,
  ju = 0,
  vn = 0,
  oa = null,
  Ly = 0;
function dt() {
  throw Error(E(321));
}
function Gs(t, e) {
  if (e === null) return !1;
  for (var l = 0; l < e.length && l < t.length; l++)
    if (!te(t[l], e[l])) return !1;
  return !0;
}
function Qs(t, e, l, a, n, u) {
  return (
    (rl = u),
    (Y = e),
    (e.memoizedState = null),
    (e.updateQueue = null),
    (e.lanes = 0),
    (B.H = t === null || t.memoizedState === null ? im : cm),
    (xl = !1),
    (u = l(a, n)),
    (xl = !1),
    ra && (u = zd(e, l, a, n)),
    Cd(t),
    u
  );
}
function Cd(t) {
  B.H = Yu;
  var e = I !== null && I.next !== null;
  if (((rl = 0), (yt = I = Y = null), (Lu = !1), (vn = 0), (oa = null), e))
    throw Error(E(300));
  t === null || Tt || ((t = t.dependencies), t !== null && Hu(t) && (Tt = !0));
}
function zd(t, e, l, a) {
  Y = t;
  var n = 0;
  do {
    if ((ra && (oa = null), (vn = 0), (ra = !1), 25 <= n)) throw Error(E(301));
    if (((n += 1), (yt = I = null), t.updateQueue != null)) {
      var u = t.updateQueue;
      ((u.lastEffect = null),
        (u.events = null),
        (u.stores = null),
        u.memoCache != null && (u.memoCache.index = 0));
    }
    ((B.H = ky), (u = e(l, a)));
  } while (ra);
  return u;
}
function jy() {
  var t = B.H,
    e = t.useState()[0];
  return (
    (e = typeof e.then == "function" ? Ln(e) : e),
    (t = t.useState()[0]),
    (I !== null ? I.memoizedState : null) !== t && (Y.flags |= 1024),
    e
  );
}
function Vs() {
  var t = ju !== 0;
  return ((ju = 0), t);
}
function ks(t, e, l) {
  ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
}
function Zs(t) {
  if (Lu) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      (e !== null && (e.pending = null), (t = t.next));
    }
    Lu = !1;
  }
  ((rl = 0), (yt = I = Y = null), (ra = !1), (vn = ju = 0), (oa = null));
}
function Lt() {
  var t = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (yt === null ? (Y.memoizedState = yt = t) : (yt = yt.next = t), yt);
}
function pt() {
  if (I === null) {
    var t = Y.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = I.next;
  var e = yt === null ? Y.memoizedState : yt.next;
  if (e !== null) ((yt = e), (I = t));
  else {
    if (t === null) throw Y.alternate === null ? Error(E(467)) : Error(E(310));
    ((I = t),
      (t = {
        memoizedState: I.memoizedState,
        baseState: I.baseState,
        baseQueue: I.baseQueue,
        queue: I.queue,
        next: null,
      }),
      yt === null ? (Y.memoizedState = yt = t) : (yt = yt.next = t));
  }
  return yt;
}
function Ks() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Ln(t) {
  var e = vn;
  return (
    (vn += 1),
    oa === null && (oa = []),
    (t = Dd(oa, t, e)),
    (e = Y),
    (yt === null ? e.memoizedState : yt.next) === null &&
      ((e = e.alternate),
      (B.H = e === null || e.memoizedState === null ? im : cm)),
    t
  );
}
function pi(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return Ln(t);
    if (t.$$typeof === Ce) return Ut(t);
  }
  throw Error(E(438, String(t)));
}
function Js(t) {
  var e = null,
    l = Y.updateQueue;
  if ((l !== null && (e = l.memoCache), e == null)) {
    var a = Y.alternate;
    a !== null &&
      ((a = a.updateQueue),
      a !== null &&
        ((a = a.memoCache),
        a != null &&
          (e = {
            data: a.data.map(function (n) {
              return n.slice();
            }),
            index: 0,
          })));
  }
  if (
    (e == null && (e = { data: [], index: 0 }),
    l === null && ((l = Ks()), (Y.updateQueue = l)),
    (l.memoCache = e),
    (l = e.data[e.index]),
    l === void 0)
  )
    for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = O0;
  return (e.index++, l);
}
function Le(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function gu(t) {
  var e = pt();
  return $s(e, I, t);
}
function $s(t, e, l) {
  var a = t.queue;
  if (a === null) throw Error(E(311));
  a.lastRenderedReducer = l;
  var n = t.baseQueue,
    u = a.pending;
  if (u !== null) {
    if (n !== null) {
      var i = n.next;
      ((n.next = u.next), (u.next = i));
    }
    ((e.baseQueue = n = u), (a.pending = null));
  }
  if (((u = t.baseState), n === null)) t.memoizedState = u;
  else {
    e = n.next;
    var c = (i = null),
      s = null,
      f = e,
      d = !1;
    do {
      var y = f.lane & -536870913;
      if (y !== f.lane ? (V & y) === y : (rl & y) === y) {
        var m = f.revertLane;
        if (m === 0)
          (s !== null &&
            (s = s.next =
              {
                lane: 0,
                revertLane: 0,
                action: f.action,
                hasEagerState: f.hasEagerState,
                eagerState: f.eagerState,
                next: null,
              }),
            y === ga && (d = !0));
        else if ((rl & m) === m) {
          ((f = f.next), m === ga && (d = !0));
          continue;
        } else
          ((y = {
            lane: 0,
            revertLane: f.revertLane,
            action: f.action,
            hasEagerState: f.hasEagerState,
            eagerState: f.eagerState,
            next: null,
          }),
            s === null ? ((c = s = y), (i = u)) : (s = s.next = y),
            (Y.lanes |= m),
            (dl |= m));
        ((y = f.action),
          xl && l(u, y),
          (u = f.hasEagerState ? f.eagerState : l(u, y)));
      } else
        ((m = {
          lane: y,
          revertLane: f.revertLane,
          action: f.action,
          hasEagerState: f.hasEagerState,
          eagerState: f.eagerState,
          next: null,
        }),
          s === null ? ((c = s = m), (i = u)) : (s = s.next = m),
          (Y.lanes |= y),
          (dl |= y));
      f = f.next;
    } while (f !== null && f !== e);
    if (
      (s === null ? (i = u) : (s.next = c),
      !te(u, t.memoizedState) && ((Tt = !0), d && ((l = fa), l !== null)))
    )
      throw l;
    ((t.memoizedState = u),
      (t.baseState = i),
      (t.baseQueue = s),
      (a.lastRenderedState = u));
  }
  return (n === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
}
function Vi(t) {
  var e = pt(),
    l = e.queue;
  if (l === null) throw Error(E(311));
  l.lastRenderedReducer = t;
  var a = l.dispatch,
    n = l.pending,
    u = e.memoizedState;
  if (n !== null) {
    l.pending = null;
    var i = (n = n.next);
    do ((u = t(u, i.action)), (i = i.next));
    while (i !== n);
    (te(u, e.memoizedState) || (Tt = !0),
      (e.memoizedState = u),
      e.baseQueue === null && (e.baseState = u),
      (l.lastRenderedState = u));
  }
  return [u, a];
}
function Ud(t, e, l) {
  var a = Y,
    n = pt(),
    u = K;
  if (u) {
    if (l === void 0) throw Error(E(407));
    l = l();
  } else l = e();
  var i = !te((I || n).memoizedState, l);
  (i && ((n.memoizedState = l), (Tt = !0)), (n = n.queue));
  var c = Bd.bind(null, a, n, t);
  if (
    (jn(2048, 8, c, [t]),
    n.getSnapshot !== e || i || (yt !== null && yt.memoizedState.tag & 1))
  ) {
    if (
      ((a.flags |= 2048),
      ba(9, gi(), wd.bind(null, a, n, l, e), null),
      lt === null)
    )
      throw Error(E(349));
    u || rl & 124 || xd(a, e, l);
  }
  return l;
}
function xd(t, e, l) {
  ((t.flags |= 16384),
    (t = { getSnapshot: e, value: l }),
    (e = Y.updateQueue),
    e === null
      ? ((e = Ks()), (Y.updateQueue = e), (e.stores = [t]))
      : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
}
function wd(t, e, l, a) {
  ((e.value = l), (e.getSnapshot = a), Hd(e) && qd(t));
}
function Bd(t, e, l) {
  return l(function () {
    Hd(e) && qd(t);
  });
}
function Hd(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !te(t, l);
  } catch {
    return !0;
  }
}
function qd(t) {
  var e = Ca(t, 2);
  e !== null && It(e, t, 2);
}
function jc(t) {
  var e = Lt();
  if (typeof t == "function") {
    var l = t;
    if (((t = l()), xl)) {
      Pe(!0);
      try {
        l();
      } finally {
        Pe(!1);
      }
    }
  }
  return (
    (e.memoizedState = e.baseState = t),
    (e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Le,
      lastRenderedState: t,
    }),
    e
  );
}
function Ld(t, e, l, a) {
  return ((t.baseState = l), $s(t, I, typeof a == "function" ? a : Le));
}
function Yy(t, e, l, a, n) {
  if (vi(t)) throw Error(E(485));
  if (((t = e.action), t !== null)) {
    var u = {
      payload: n,
      action: t,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (i) {
        u.listeners.push(i);
      },
    };
    (B.T !== null ? l(!0) : (u.isTransition = !1),
      a(u),
      (l = e.pending),
      l === null
        ? ((u.next = e.pending = u), jd(e, u))
        : ((u.next = l.next), (e.pending = l.next = u)));
  }
}
function jd(t, e) {
  var l = e.action,
    a = e.payload,
    n = t.state;
  if (e.isTransition) {
    var u = B.T,
      i = {};
    B.T = i;
    try {
      var c = l(n, a),
        s = B.S;
      (s !== null && s(i, c), or(t, e, c));
    } catch (f) {
      Yc(t, e, f);
    } finally {
      B.T = u;
    }
  } else
    try {
      ((u = l(n, a)), or(t, e, u));
    } catch (f) {
      Yc(t, e, f);
    }
}
function or(t, e, l) {
  l !== null && typeof l == "object" && typeof l.then == "function"
    ? l.then(
        function (a) {
          dr(t, e, a);
        },
        function (a) {
          return Yc(t, e, a);
        },
      )
    : dr(t, e, l);
}
function dr(t, e, l) {
  ((e.status = "fulfilled"),
    (e.value = l),
    Yd(e),
    (t.state = l),
    (e = t.pending),
    e !== null &&
      ((l = e.next),
      l === e ? (t.pending = null) : ((l = l.next), (e.next = l), jd(t, l))));
}
function Yc(t, e, l) {
  var a = t.pending;
  if (((t.pending = null), a !== null)) {
    a = a.next;
    do ((e.status = "rejected"), (e.reason = l), Yd(e), (e = e.next));
    while (e !== a);
  }
  t.action = null;
}
function Yd(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function Xd(t, e) {
  return e;
}
function mr(t, e) {
  if (K) {
    var l = lt.formState;
    if (l !== null) {
      t: {
        var a = Y;
        if (K) {
          if (ft) {
            e: {
              for (var n = ft, u = pe; n.nodeType !== 8; ) {
                if (!u) {
                  n = null;
                  break e;
                }
                if (((n = de(n.nextSibling)), n === null)) {
                  n = null;
                  break e;
                }
              }
              ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
            }
            if (n) {
              ((ft = de(n.nextSibling)), (a = n.data === "F!"));
              break t;
            }
          }
          zl(a);
        }
        a = !1;
      }
      a && (e = l[0]);
    }
  }
  return (
    (l = Lt()),
    (l.memoizedState = l.baseState = e),
    (a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xd,
      lastRenderedState: e,
    }),
    (l.queue = a),
    (l = am.bind(null, Y, a)),
    (a.dispatch = l),
    (a = jc(!1)),
    (u = Is.bind(null, Y, !1, a.queue)),
    (a = Lt()),
    (n = { state: e, dispatch: null, action: t, pending: null }),
    (a.queue = n),
    (l = Yy.bind(null, Y, n, u, l)),
    (n.dispatch = l),
    (a.memoizedState = t),
    [e, l, !1]
  );
}
function hr(t) {
  var e = pt();
  return Gd(e, I, t);
}
function Gd(t, e, l) {
  if (
    ((e = $s(t, e, Xd)[0]),
    (t = gu(Le)[0]),
    typeof e == "object" && e !== null && typeof e.then == "function")
  )
    try {
      var a = Ln(e);
    } catch (i) {
      throw i === qn ? yi : i;
    }
  else a = e;
  e = pt();
  var n = e.queue,
    u = n.dispatch;
  return (
    l !== e.memoizedState &&
      ((Y.flags |= 2048), ba(9, gi(), Xy.bind(null, n, l), null)),
    [a, u, t]
  );
}
function Xy(t, e) {
  t.action = e;
}
function yr(t) {
  var e = pt(),
    l = I;
  if (l !== null) return Gd(e, l, t);
  (pt(), (e = e.memoizedState), (l = pt()));
  var a = l.queue.dispatch;
  return ((l.memoizedState = t), [e, a, !1]);
}
function ba(t, e, l, a) {
  return (
    (t = { tag: t, create: l, deps: a, inst: e, next: null }),
    (e = Y.updateQueue),
    e === null && ((e = Ks()), (Y.updateQueue = e)),
    (l = e.lastEffect),
    l === null
      ? (e.lastEffect = t.next = t)
      : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
    t
  );
}
function gi() {
  return { destroy: void 0, resource: void 0 };
}
function Qd() {
  return pt().memoizedState;
}
function vu(t, e, l, a) {
  var n = Lt();
  ((a = a === void 0 ? null : a),
    (Y.flags |= t),
    (n.memoizedState = ba(1 | e, gi(), l, a)));
}
function jn(t, e, l, a) {
  var n = pt();
  a = a === void 0 ? null : a;
  var u = n.memoizedState.inst;
  I !== null && a !== null && Gs(a, I.memoizedState.deps)
    ? (n.memoizedState = ba(e, u, l, a))
    : ((Y.flags |= t), (n.memoizedState = ba(1 | e, u, l, a)));
}
function pr(t, e) {
  vu(8390656, 8, t, e);
}
function Vd(t, e) {
  jn(2048, 8, t, e);
}
function kd(t, e) {
  return jn(4, 2, t, e);
}
function Zd(t, e) {
  return jn(4, 4, t, e);
}
function Kd(t, e) {
  if (typeof e == "function") {
    t = t();
    var l = e(t);
    return function () {
      typeof l == "function" ? l() : e(null);
    };
  }
  if (e != null)
    return (
      (t = t()),
      (e.current = t),
      function () {
        e.current = null;
      }
    );
}
function Jd(t, e, l) {
  ((l = l != null ? l.concat([t]) : null), jn(4, 4, Kd.bind(null, e, t), l));
}
function Fs() {}
function $d(t, e) {
  var l = pt();
  e = e === void 0 ? null : e;
  var a = l.memoizedState;
  return e !== null && Gs(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
}
function Fd(t, e) {
  var l = pt();
  e = e === void 0 ? null : e;
  var a = l.memoizedState;
  if (e !== null && Gs(e, a[1])) return a[0];
  if (((a = t()), xl)) {
    Pe(!0);
    try {
      t();
    } finally {
      Pe(!1);
    }
  }
  return ((l.memoizedState = [a, e]), a);
}
function Ws(t, e, l) {
  return l === void 0 || rl & 1073741824
    ? (t.memoizedState = e)
    : ((t.memoizedState = l), (t = Ym()), (Y.lanes |= t), (dl |= t), l);
}
function Wd(t, e, l, a) {
  return te(l, e)
    ? l
    : va.current !== null
      ? ((t = Ws(t, l, a)), te(t, e) || (Tt = !0), t)
      : rl & 42
        ? ((t = Ym()), (Y.lanes |= t), (dl |= t), e)
        : ((Tt = !0), (t.memoizedState = l));
}
function Pd(t, e, l, a, n) {
  var u = J.p;
  J.p = u !== 0 && 8 > u ? u : 8;
  var i = B.T,
    c = {};
  ((B.T = c), Is(t, !1, e, l));
  try {
    var s = n(),
      f = B.S;
    if (
      (f !== null && f(c, s),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      var d = qy(s, a);
      cn(t, e, d, Pt(t));
    } else cn(t, e, a, Pt(t));
  } catch (y) {
    cn(t, e, { then: function () {}, status: "rejected", reason: y }, Pt());
  } finally {
    ((J.p = u), (B.T = i));
  }
}
function Gy() {}
function Xc(t, e, l, a) {
  if (t.tag !== 5) throw Error(E(476));
  var n = Id(t).queue;
  Pd(
    t,
    n,
    e,
    Ol,
    l === null
      ? Gy
      : function () {
          return (tm(t), l(a));
        },
  );
}
function Id(t) {
  var e = t.memoizedState;
  if (e !== null) return e;
  e = {
    memoizedState: Ol,
    baseState: Ol,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Le,
      lastRenderedState: Ol,
    },
    next: null,
  };
  var l = {};
  return (
    (e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Le,
        lastRenderedState: l,
      },
      next: null,
    }),
    (t.memoizedState = e),
    (t = t.alternate),
    t !== null && (t.memoizedState = e),
    e
  );
}
function tm(t) {
  var e = Id(t).next.queue;
  cn(t, e, {}, Pt());
}
function Ps() {
  return Ut(On);
}
function em() {
  return pt().memoizedState;
}
function lm() {
  return pt().memoizedState;
}
function Qy(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var l = Pt();
        t = al(l);
        var a = nl(e, t, l);
        (a !== null && (It(a, e, l), an(a, e, l)),
          (e = { cache: Ls() }),
          (t.payload = e));
        return;
    }
    e = e.return;
  }
}
function Vy(t, e, l) {
  var a = Pt();
  ((l = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    vi(t)
      ? nm(e, l)
      : ((l = ws(t, e, l, a)), l !== null && (It(l, t, a), um(l, e, a))));
}
function am(t, e, l) {
  var a = Pt();
  cn(t, e, l, a);
}
function cn(t, e, l, a) {
  var n = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (vi(t)) nm(e, n);
  else {
    var u = t.alternate;
    if (
      t.lanes === 0 &&
      (u === null || u.lanes === 0) &&
      ((u = e.lastRenderedReducer), u !== null)
    )
      try {
        var i = e.lastRenderedState,
          c = u(i, l);
        if (((n.hasEagerState = !0), (n.eagerState = c), te(c, i)))
          return (hi(t, e, n, 0), lt === null && mi(), !1);
      } catch {
      } finally {
      }
    if (((l = ws(t, e, n, a)), l !== null))
      return (It(l, t, a), um(l, e, a), !0);
  }
  return !1;
}
function Is(t, e, l, a) {
  if (
    ((a = {
      lane: 2,
      revertLane: sf(),
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    vi(t))
  ) {
    if (e) throw Error(E(479));
  } else ((e = ws(t, l, a, 2)), e !== null && It(e, t, 2));
}
function vi(t) {
  var e = t.alternate;
  return t === Y || (e !== null && e === Y);
}
function nm(t, e) {
  ra = Lu = !0;
  var l = t.pending;
  (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)),
    (t.pending = e));
}
function um(t, e, l) {
  if (l & 4194048) {
    var a = e.lanes;
    ((a &= t.pendingLanes), (l |= a), (e.lanes = l), $o(t, l));
  }
}
var Yu = {
    readContext: Ut,
    use: pi,
    useCallback: dt,
    useContext: dt,
    useEffect: dt,
    useImperativeHandle: dt,
    useLayoutEffect: dt,
    useInsertionEffect: dt,
    useMemo: dt,
    useReducer: dt,
    useRef: dt,
    useState: dt,
    useDebugValue: dt,
    useDeferredValue: dt,
    useTransition: dt,
    useSyncExternalStore: dt,
    useId: dt,
    useHostTransitionStatus: dt,
    useFormState: dt,
    useActionState: dt,
    useOptimistic: dt,
    useMemoCache: dt,
    useCacheRefresh: dt,
  },
  im = {
    readContext: Ut,
    use: pi,
    useCallback: function (t, e) {
      return ((Lt().memoizedState = [t, e === void 0 ? null : e]), t);
    },
    useContext: Ut,
    useEffect: pr,
    useImperativeHandle: function (t, e, l) {
      ((l = l != null ? l.concat([t]) : null),
        vu(4194308, 4, Kd.bind(null, e, t), l));
    },
    useLayoutEffect: function (t, e) {
      return vu(4194308, 4, t, e);
    },
    useInsertionEffect: function (t, e) {
      vu(4, 2, t, e);
    },
    useMemo: function (t, e) {
      var l = Lt();
      e = e === void 0 ? null : e;
      var a = t();
      if (xl) {
        Pe(!0);
        try {
          t();
        } finally {
          Pe(!1);
        }
      }
      return ((l.memoizedState = [a, e]), a);
    },
    useReducer: function (t, e, l) {
      var a = Lt();
      if (l !== void 0) {
        var n = l(e);
        if (xl) {
          Pe(!0);
          try {
            l(e);
          } finally {
            Pe(!1);
          }
        }
      } else n = e;
      return (
        (a.memoizedState = a.baseState = n),
        (t = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: n,
        }),
        (a.queue = t),
        (t = t.dispatch = Vy.bind(null, Y, t)),
        [a.memoizedState, t]
      );
    },
    useRef: function (t) {
      var e = Lt();
      return ((t = { current: t }), (e.memoizedState = t));
    },
    useState: function (t) {
      t = jc(t);
      var e = t.queue,
        l = am.bind(null, Y, e);
      return ((e.dispatch = l), [t.memoizedState, l]);
    },
    useDebugValue: Fs,
    useDeferredValue: function (t, e) {
      var l = Lt();
      return Ws(l, t, e);
    },
    useTransition: function () {
      var t = jc(!1);
      return (
        (t = Pd.bind(null, Y, t.queue, !0, !1)),
        (Lt().memoizedState = t),
        [!1, t]
      );
    },
    useSyncExternalStore: function (t, e, l) {
      var a = Y,
        n = Lt();
      if (K) {
        if (l === void 0) throw Error(E(407));
        l = l();
      } else {
        if (((l = e()), lt === null)) throw Error(E(349));
        V & 124 || xd(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return (
        (n.queue = u),
        pr(Bd.bind(null, a, u, t), [t]),
        (a.flags |= 2048),
        ba(9, gi(), wd.bind(null, a, u, l, e), null),
        l
      );
    },
    useId: function () {
      var t = Lt(),
        e = lt.identifierPrefix;
      if (K) {
        var l = Ue,
          a = ze;
        ((l = (a & ~(1 << (32 - Wt(a) - 1))).toString(32) + l),
          (e = "«" + e + "R" + l),
          (l = ju++),
          0 < l && (e += "H" + l.toString(32)),
          (e += "»"));
      } else ((l = Ly++), (e = "«" + e + "r" + l.toString(32) + "»"));
      return (t.memoizedState = e);
    },
    useHostTransitionStatus: Ps,
    useFormState: mr,
    useActionState: mr,
    useOptimistic: function (t) {
      var e = Lt();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (e.queue = l),
        (e = Is.bind(null, Y, !0, l)),
        (l.dispatch = e),
        [t, e]
      );
    },
    useMemoCache: Js,
    useCacheRefresh: function () {
      return (Lt().memoizedState = Qy.bind(null, Y));
    },
  },
  cm = {
    readContext: Ut,
    use: pi,
    useCallback: $d,
    useContext: Ut,
    useEffect: Vd,
    useImperativeHandle: Jd,
    useInsertionEffect: kd,
    useLayoutEffect: Zd,
    useMemo: Fd,
    useReducer: gu,
    useRef: Qd,
    useState: function () {
      return gu(Le);
    },
    useDebugValue: Fs,
    useDeferredValue: function (t, e) {
      var l = pt();
      return Wd(l, I.memoizedState, t, e);
    },
    useTransition: function () {
      var t = gu(Le)[0],
        e = pt().memoizedState;
      return [typeof t == "boolean" ? t : Ln(t), e];
    },
    useSyncExternalStore: Ud,
    useId: em,
    useHostTransitionStatus: Ps,
    useFormState: hr,
    useActionState: hr,
    useOptimistic: function (t, e) {
      var l = pt();
      return Ld(l, I, t, e);
    },
    useMemoCache: Js,
    useCacheRefresh: lm,
  },
  ky = {
    readContext: Ut,
    use: pi,
    useCallback: $d,
    useContext: Ut,
    useEffect: Vd,
    useImperativeHandle: Jd,
    useInsertionEffect: kd,
    useLayoutEffect: Zd,
    useMemo: Fd,
    useReducer: Vi,
    useRef: Qd,
    useState: function () {
      return Vi(Le);
    },
    useDebugValue: Fs,
    useDeferredValue: function (t, e) {
      var l = pt();
      return I === null ? Ws(l, t, e) : Wd(l, I.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Vi(Le)[0],
        e = pt().memoizedState;
      return [typeof t == "boolean" ? t : Ln(t), e];
    },
    useSyncExternalStore: Ud,
    useId: em,
    useHostTransitionStatus: Ps,
    useFormState: yr,
    useActionState: yr,
    useOptimistic: function (t, e) {
      var l = pt();
      return I !== null
        ? Ld(l, I, t, e)
        : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: Js,
    useCacheRefresh: lm,
  },
  da = null,
  bn = 0;
function au(t) {
  var e = bn;
  return ((bn += 1), da === null && (da = []), Dd(da, t, e));
}
function Xa(t, e) {
  ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
}
function nu(t, e) {
  throw e.$$typeof === E0
    ? Error(E(525))
    : ((t = Object.prototype.toString.call(e)),
      Error(
        E(
          31,
          t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t,
        ),
      ));
}
function gr(t) {
  var e = t._init;
  return e(t._payload);
}
function sm(t) {
  function e(o, r) {
    if (t) {
      var h = o.deletions;
      h === null ? ((o.deletions = [r]), (o.flags |= 16)) : h.push(r);
    }
  }
  function l(o, r) {
    if (!t) return null;
    for (; r !== null; ) (e(o, r), (r = r.sibling));
    return null;
  }
  function a(o) {
    for (var r = new Map(); o !== null; )
      (o.key !== null ? r.set(o.key, o) : r.set(o.index, o), (o = o.sibling));
    return r;
  }
  function n(o, r) {
    return ((o = Be(o, r)), (o.index = 0), (o.sibling = null), o);
  }
  function u(o, r, h) {
    return (
      (o.index = h),
      t
        ? ((h = o.alternate),
          h !== null
            ? ((h = h.index), h < r ? ((o.flags |= 67108866), r) : h)
            : ((o.flags |= 67108866), r))
        : ((o.flags |= 1048576), r)
    );
  }
  function i(o) {
    return (t && o.alternate === null && (o.flags |= 67108866), o);
  }
  function c(o, r, h, b) {
    return r === null || r.tag !== 6
      ? ((r = Xi(h, o.mode, b)), (r.return = o), r)
      : ((r = n(r, h)), (r.return = o), r);
  }
  function s(o, r, h, b) {
    var _ = h.type;
    return _ === Jl
      ? d(o, r, h.props.children, b, h.key)
      : r !== null &&
          (r.elementType === _ ||
            (typeof _ == "object" &&
              _ !== null &&
              _.$$typeof === Ze &&
              gr(_) === r.type))
        ? ((r = n(r, h.props)), Xa(r, h), (r.return = o), r)
        : ((r = yu(h.type, h.key, h.props, null, o.mode, b)),
          Xa(r, h),
          (r.return = o),
          r);
  }
  function f(o, r, h, b) {
    return r === null ||
      r.tag !== 4 ||
      r.stateNode.containerInfo !== h.containerInfo ||
      r.stateNode.implementation !== h.implementation
      ? ((r = Gi(h, o.mode, b)), (r.return = o), r)
      : ((r = n(r, h.children || [])), (r.return = o), r);
  }
  function d(o, r, h, b, _) {
    return r === null || r.tag !== 7
      ? ((r = Tl(h, o.mode, b, _)), (r.return = o), r)
      : ((r = n(r, h)), (r.return = o), r);
  }
  function y(o, r, h) {
    if (
      (typeof r == "string" && r !== "") ||
      typeof r == "number" ||
      typeof r == "bigint"
    )
      return ((r = Xi("" + r, o.mode, h)), (r.return = o), r);
    if (typeof r == "object" && r !== null) {
      switch (r.$$typeof) {
        case Fn:
          return (
            (h = yu(r.type, r.key, r.props, null, o.mode, h)),
            Xa(h, r),
            (h.return = o),
            h
          );
        case Ka:
          return ((r = Gi(r, o.mode, h)), (r.return = o), r);
        case Ze:
          var b = r._init;
          return ((r = b(r._payload)), y(o, r, h));
      }
      if (Ja(r) || qa(r))
        return ((r = Tl(r, o.mode, h, null)), (r.return = o), r);
      if (typeof r.then == "function") return y(o, au(r), h);
      if (r.$$typeof === Ce) return y(o, eu(o, r), h);
      nu(o, r);
    }
    return null;
  }
  function m(o, r, h, b) {
    var _ = r !== null ? r.key : null;
    if (
      (typeof h == "string" && h !== "") ||
      typeof h == "number" ||
      typeof h == "bigint"
    )
      return _ !== null ? null : c(o, r, "" + h, b);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Fn:
          return h.key === _ ? s(o, r, h, b) : null;
        case Ka:
          return h.key === _ ? f(o, r, h, b) : null;
        case Ze:
          return ((_ = h._init), (h = _(h._payload)), m(o, r, h, b));
      }
      if (Ja(h) || qa(h)) return _ !== null ? null : d(o, r, h, b, null);
      if (typeof h.then == "function") return m(o, r, au(h), b);
      if (h.$$typeof === Ce) return m(o, r, eu(o, h), b);
      nu(o, h);
    }
    return null;
  }
  function p(o, r, h, b, _) {
    if (
      (typeof b == "string" && b !== "") ||
      typeof b == "number" ||
      typeof b == "bigint"
    )
      return ((o = o.get(h) || null), c(r, o, "" + b, _));
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case Fn:
          return (
            (o = o.get(b.key === null ? h : b.key) || null),
            s(r, o, b, _)
          );
        case Ka:
          return (
            (o = o.get(b.key === null ? h : b.key) || null),
            f(r, o, b, _)
          );
        case Ze:
          var N = b._init;
          return ((b = N(b._payload)), p(o, r, h, b, _));
      }
      if (Ja(b) || qa(b)) return ((o = o.get(h) || null), d(r, o, b, _, null));
      if (typeof b.then == "function") return p(o, r, h, au(b), _);
      if (b.$$typeof === Ce) return p(o, r, h, eu(r, b), _);
      nu(r, b);
    }
    return null;
  }
  function T(o, r, h, b) {
    for (
      var _ = null, N = null, D = r, z = (r = 0), X = null;
      D !== null && z < h.length;
      z++
    ) {
      D.index > z ? ((X = D), (D = null)) : (X = D.sibling);
      var w = m(o, D, h[z], b);
      if (w === null) {
        D === null && (D = X);
        break;
      }
      (t && D && w.alternate === null && e(o, D),
        (r = u(w, r, z)),
        N === null ? (_ = w) : (N.sibling = w),
        (N = w),
        (D = X));
    }
    if (z === h.length) return (l(o, D), K && bl(o, z), _);
    if (D === null) {
      for (; z < h.length; z++)
        ((D = y(o, h[z], b)),
          D !== null &&
            ((r = u(D, r, z)),
            N === null ? (_ = D) : (N.sibling = D),
            (N = D)));
      return (K && bl(o, z), _);
    }
    for (D = a(D); z < h.length; z++)
      ((X = p(D, o, z, h[z], b)),
        X !== null &&
          (t && X.alternate !== null && D.delete(X.key === null ? z : X.key),
          (r = u(X, r, z)),
          N === null ? (_ = X) : (N.sibling = X),
          (N = X)));
    return (
      t &&
        D.forEach(function (tt) {
          return e(o, tt);
        }),
      K && bl(o, z),
      _
    );
  }
  function A(o, r, h, b) {
    if (h == null) throw Error(E(151));
    for (
      var _ = null, N = null, D = r, z = (r = 0), X = null, w = h.next();
      D !== null && !w.done;
      z++, w = h.next()
    ) {
      D.index > z ? ((X = D), (D = null)) : (X = D.sibling);
      var tt = m(o, D, w.value, b);
      if (tt === null) {
        D === null && (D = X);
        break;
      }
      (t && D && tt.alternate === null && e(o, D),
        (r = u(tt, r, z)),
        N === null ? (_ = tt) : (N.sibling = tt),
        (N = tt),
        (D = X));
    }
    if (w.done) return (l(o, D), K && bl(o, z), _);
    if (D === null) {
      for (; !w.done; z++, w = h.next())
        ((w = y(o, w.value, b)),
          w !== null &&
            ((r = u(w, r, z)),
            N === null ? (_ = w) : (N.sibling = w),
            (N = w)));
      return (K && bl(o, z), _);
    }
    for (D = a(D); !w.done; z++, w = h.next())
      ((w = p(D, o, z, w.value, b)),
        w !== null &&
          (t && w.alternate !== null && D.delete(w.key === null ? z : w.key),
          (r = u(w, r, z)),
          N === null ? (_ = w) : (N.sibling = w),
          (N = w)));
    return (
      t &&
        D.forEach(function (St) {
          return e(o, St);
        }),
      K && bl(o, z),
      _
    );
  }
  function R(o, r, h, b) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === Jl &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case Fn:
          t: {
            for (var _ = h.key; r !== null; ) {
              if (r.key === _) {
                if (((_ = h.type), _ === Jl)) {
                  if (r.tag === 7) {
                    (l(o, r.sibling),
                      (b = n(r, h.props.children)),
                      (b.return = o),
                      (o = b));
                    break t;
                  }
                } else if (
                  r.elementType === _ ||
                  (typeof _ == "object" &&
                    _ !== null &&
                    _.$$typeof === Ze &&
                    gr(_) === r.type)
                ) {
                  (l(o, r.sibling),
                    (b = n(r, h.props)),
                    Xa(b, h),
                    (b.return = o),
                    (o = b));
                  break t;
                }
                l(o, r);
                break;
              } else e(o, r);
              r = r.sibling;
            }
            h.type === Jl
              ? ((b = Tl(h.props.children, o.mode, b, h.key)),
                (b.return = o),
                (o = b))
              : ((b = yu(h.type, h.key, h.props, null, o.mode, b)),
                Xa(b, h),
                (b.return = o),
                (o = b));
          }
          return i(o);
        case Ka:
          t: {
            for (_ = h.key; r !== null; ) {
              if (r.key === _)
                if (
                  r.tag === 4 &&
                  r.stateNode.containerInfo === h.containerInfo &&
                  r.stateNode.implementation === h.implementation
                ) {
                  (l(o, r.sibling),
                    (b = n(r, h.children || [])),
                    (b.return = o),
                    (o = b));
                  break t;
                } else {
                  l(o, r);
                  break;
                }
              else e(o, r);
              r = r.sibling;
            }
            ((b = Gi(h, o.mode, b)), (b.return = o), (o = b));
          }
          return i(o);
        case Ze:
          return ((_ = h._init), (h = _(h._payload)), R(o, r, h, b));
      }
      if (Ja(h)) return T(o, r, h, b);
      if (qa(h)) {
        if (((_ = qa(h)), typeof _ != "function")) throw Error(E(150));
        return ((h = _.call(h)), A(o, r, h, b));
      }
      if (typeof h.then == "function") return R(o, r, au(h), b);
      if (h.$$typeof === Ce) return R(o, r, eu(o, h), b);
      nu(o, h);
    }
    return (typeof h == "string" && h !== "") ||
      typeof h == "number" ||
      typeof h == "bigint"
      ? ((h = "" + h),
        r !== null && r.tag === 6
          ? (l(o, r.sibling), (b = n(r, h)), (b.return = o), (o = b))
          : (l(o, r), (b = Xi(h, o.mode, b)), (b.return = o), (o = b)),
        i(o))
      : l(o, r);
  }
  return function (o, r, h, b) {
    try {
      bn = 0;
      var _ = R(o, r, h, b);
      return ((da = null), _);
    } catch (D) {
      if (D === qn || D === yi) throw D;
      var N = $t(29, D, null, o.mode);
      return ((N.lanes = b), (N.return = o), N);
    } finally {
    }
  };
}
var Sa = sm(!0),
  fm = sm(!1),
  fe = Ee(null),
  Se = null;
function $e(t) {
  var e = t.alternate;
  (it(vt, vt.current & 1),
    it(fe, t),
    Se === null &&
      (e === null || va.current !== null || e.memoizedState !== null) &&
      (Se = t));
}
function rm(t) {
  if (t.tag === 22) {
    if ((it(vt, vt.current), it(fe, t), Se === null)) {
      var e = t.alternate;
      e !== null && e.memoizedState !== null && (Se = t);
    }
  } else Fe();
}
function Fe() {
  (it(vt, vt.current), it(fe, fe.current));
}
function we(t) {
  (Rt(fe), Se === t && (Se = null), Rt(vt));
}
var vt = Ee(0);
function Xu(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var l = e.memoizedState;
      if (
        l !== null &&
        ((l = l.dehydrated), l === null || l.data === "$?" || ns(l))
      )
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      ((e.child.return = e), (e = e.child));
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    ((e.sibling.return = e.return), (e = e.sibling));
  }
  return null;
}
function ki(t, e, l, a) {
  ((e = t.memoizedState),
    (l = l(a, e)),
    (l = l == null ? e : at({}, e, l)),
    (t.memoizedState = l),
    t.lanes === 0 && (t.updateQueue.baseState = l));
}
var Gc = {
  enqueueSetState: function (t, e, l) {
    t = t._reactInternals;
    var a = Pt(),
      n = al(a);
    ((n.payload = e),
      l != null && (n.callback = l),
      (e = nl(t, n, a)),
      e !== null && (It(e, t, a), an(e, t, a)));
  },
  enqueueReplaceState: function (t, e, l) {
    t = t._reactInternals;
    var a = Pt(),
      n = al(a);
    ((n.tag = 1),
      (n.payload = e),
      l != null && (n.callback = l),
      (e = nl(t, n, a)),
      e !== null && (It(e, t, a), an(e, t, a)));
  },
  enqueueForceUpdate: function (t, e) {
    t = t._reactInternals;
    var l = Pt(),
      a = al(l);
    ((a.tag = 2),
      e != null && (a.callback = e),
      (e = nl(t, a, l)),
      e !== null && (It(e, t, l), an(e, t, l)));
  },
};
function vr(t, e, l, a, n, u, i) {
  return (
    (t = t.stateNode),
    typeof t.shouldComponentUpdate == "function"
      ? t.shouldComponentUpdate(a, u, i)
      : e.prototype && e.prototype.isPureReactComponent
        ? !pn(l, a) || !pn(n, u)
        : !0
  );
}
function br(t, e, l, a) {
  ((t = e.state),
    typeof e.componentWillReceiveProps == "function" &&
      e.componentWillReceiveProps(l, a),
    typeof e.UNSAFE_componentWillReceiveProps == "function" &&
      e.UNSAFE_componentWillReceiveProps(l, a),
    e.state !== t && Gc.enqueueReplaceState(e, e.state, null));
}
function wl(t, e) {
  var l = e;
  if ("ref" in e) {
    l = {};
    for (var a in e) a !== "ref" && (l[a] = e[a]);
  }
  if ((t = t.defaultProps)) {
    l === e && (l = at({}, l));
    for (var n in t) l[n] === void 0 && (l[n] = t[n]);
  }
  return l;
}
var Gu =
  typeof reportError == "function"
    ? reportError
    : function (t) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var e = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof t == "object" && t !== null && typeof t.message == "string"
                ? String(t.message)
                : String(t),
            error: t,
          });
          if (!window.dispatchEvent(e)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", t);
          return;
        }
        console.error(t);
      };
function om(t) {
  Gu(t);
}
function dm(t) {
  console.error(t);
}
function mm(t) {
  Gu(t);
}
function Qu(t, e) {
  try {
    var l = t.onUncaughtError;
    l(e.value, { componentStack: e.stack });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function Sr(t, e, l) {
  try {
    var a = t.onCaughtError;
    a(l.value, {
      componentStack: l.stack,
      errorBoundary: e.tag === 1 ? e.stateNode : null,
    });
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function Qc(t, e, l) {
  return (
    (l = al(l)),
    (l.tag = 3),
    (l.payload = { element: null }),
    (l.callback = function () {
      Qu(t, e);
    }),
    l
  );
}
function hm(t) {
  return ((t = al(t)), (t.tag = 3), t);
}
function ym(t, e, l, a) {
  var n = l.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var u = a.value;
    ((t.payload = function () {
      return n(u);
    }),
      (t.callback = function () {
        Sr(e, l, a);
      }));
  }
  var i = l.stateNode;
  i !== null &&
    typeof i.componentDidCatch == "function" &&
    (t.callback = function () {
      (Sr(e, l, a),
        typeof n != "function" &&
          (ul === null ? (ul = new Set([this])) : ul.add(this)));
      var c = a.stack;
      this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
    });
}
function Zy(t, e, l, a, n) {
  if (
    ((l.flags |= 32768),
    a !== null && typeof a == "object" && typeof a.then == "function")
  ) {
    if (
      ((e = l.alternate),
      e !== null && Bn(e, l, n, !0),
      (l = fe.current),
      l !== null)
    ) {
      switch (l.tag) {
        case 13:
          return (
            Se === null ? Wc() : l.alternate === null && rt === 0 && (rt = 3),
            (l.flags &= -257),
            (l.flags |= 65536),
            (l.lanes = n),
            a === Bc
              ? (l.flags |= 16384)
              : ((e = l.updateQueue),
                e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                lc(t, a, n)),
            !1
          );
        case 22:
          return (
            (l.flags |= 65536),
            a === Bc
              ? (l.flags |= 16384)
              : ((e = l.updateQueue),
                e === null
                  ? ((e = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([a]),
                    }),
                    (l.updateQueue = e))
                  : ((l = e.retryQueue),
                    l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                lc(t, a, n)),
            !1
          );
      }
      throw Error(E(435, l.tag));
    }
    return (lc(t, a, n), Wc(), !1);
  }
  if (K)
    return (
      (e = fe.current),
      e !== null
        ? (!(e.flags & 65536) && (e.flags |= 256),
          (e.flags |= 65536),
          (e.lanes = n),
          a !== Cc && ((t = Error(E(422), { cause: a })), gn(ce(t, l))))
        : (a !== Cc && ((e = Error(E(423), { cause: a })), gn(ce(e, l))),
          (t = t.current.alternate),
          (t.flags |= 65536),
          (n &= -n),
          (t.lanes |= n),
          (a = ce(a, l)),
          (n = Qc(t.stateNode, a, n)),
          Qi(t, n),
          rt !== 4 && (rt = 2)),
      !1
    );
  var u = Error(E(520), { cause: a });
  if (
    ((u = ce(u, l)),
    rn === null ? (rn = [u]) : rn.push(u),
    rt !== 4 && (rt = 2),
    e === null)
  )
    return !0;
  ((a = ce(a, l)), (l = e));
  do {
    switch (l.tag) {
      case 3:
        return (
          (l.flags |= 65536),
          (t = n & -n),
          (l.lanes |= t),
          (t = Qc(l.stateNode, a, t)),
          Qi(l, t),
          !1
        );
      case 1:
        if (
          ((e = l.type),
          (u = l.stateNode),
          (l.flags & 128) === 0 &&
            (typeof e.getDerivedStateFromError == "function" ||
              (u !== null &&
                typeof u.componentDidCatch == "function" &&
                (ul === null || !ul.has(u)))))
        )
          return (
            (l.flags |= 65536),
            (n &= -n),
            (l.lanes |= n),
            (n = hm(n)),
            ym(n, t, l, a),
            Qi(l, n),
            !1
          );
    }
    l = l.return;
  } while (l !== null);
  return !1;
}
var pm = Error(E(461)),
  Tt = !1;
function _t(t, e, l, a) {
  e.child = t === null ? fm(e, null, l, a) : Sa(e, t.child, l, a);
}
function Er(t, e, l, a, n) {
  l = l.render;
  var u = e.ref;
  if ("ref" in a) {
    var i = {};
    for (var c in a) c !== "ref" && (i[c] = a[c]);
  } else i = a;
  return (
    Ul(e),
    (a = Qs(t, e, l, i, u, n)),
    (c = Vs()),
    t !== null && !Tt
      ? (ks(t, e, n), je(t, e, n))
      : (K && c && Hs(e), (e.flags |= 1), _t(t, e, a, n), e.child)
  );
}
function Ar(t, e, l, a, n) {
  if (t === null) {
    var u = l.type;
    return typeof u == "function" &&
      !Bs(u) &&
      u.defaultProps === void 0 &&
      l.compare === null
      ? ((e.tag = 15), (e.type = u), gm(t, e, u, a, n))
      : ((t = yu(l.type, null, a, e, e.mode, n)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t));
  }
  if (((u = t.child), !tf(t, n))) {
    var i = u.memoizedProps;
    if (
      ((l = l.compare), (l = l !== null ? l : pn), l(i, a) && t.ref === e.ref)
    )
      return je(t, e, n);
  }
  return (
    (e.flags |= 1),
    (t = Be(u, a)),
    (t.ref = e.ref),
    (t.return = e),
    (e.child = t)
  );
}
function gm(t, e, l, a, n) {
  if (t !== null) {
    var u = t.memoizedProps;
    if (pn(u, a) && t.ref === e.ref)
      if (((Tt = !1), (e.pendingProps = a = u), tf(t, n)))
        t.flags & 131072 && (Tt = !0);
      else return ((e.lanes = t.lanes), je(t, e, n));
  }
  return Vc(t, e, l, a, n);
}
function vm(t, e, l) {
  var a = e.pendingProps,
    n = a.children,
    u = t !== null ? t.memoizedState : null;
  if (a.mode === "hidden") {
    if (e.flags & 128) {
      if (((a = u !== null ? u.baseLanes | l : l), t !== null)) {
        for (n = e.child = t.child, u = 0; n !== null; )
          ((u = u | n.lanes | n.childLanes), (n = n.sibling));
        e.childLanes = u & ~a;
      } else ((e.childLanes = 0), (e.child = null));
      return Or(t, e, a, l);
    }
    if (l & 536870912)
      ((e.memoizedState = { baseLanes: 0, cachePool: null }),
        t !== null && pu(e, u !== null ? u.cachePool : null),
        u !== null ? rr(e, u) : Lc(),
        rm(e));
    else
      return (
        (e.lanes = e.childLanes = 536870912),
        Or(t, e, u !== null ? u.baseLanes | l : l, l)
      );
  } else
    u !== null
      ? (pu(e, u.cachePool), rr(e, u), Fe(), (e.memoizedState = null))
      : (t !== null && pu(e, null), Lc(), Fe());
  return (_t(t, e, n, l), e.child);
}
function Or(t, e, l, a) {
  var n = js();
  return (
    (n = n === null ? null : { parent: gt._currentValue, pool: n }),
    (e.memoizedState = { baseLanes: l, cachePool: n }),
    t !== null && pu(e, null),
    Lc(),
    rm(e),
    t !== null && Bn(t, e, a, !0),
    null
  );
}
function bu(t, e) {
  var l = e.ref;
  if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
  else {
    if (typeof l != "function" && typeof l != "object") throw Error(E(284));
    (t === null || t.ref !== l) && (e.flags |= 4194816);
  }
}
function Vc(t, e, l, a, n) {
  return (
    Ul(e),
    (l = Qs(t, e, l, a, void 0, n)),
    (a = Vs()),
    t !== null && !Tt
      ? (ks(t, e, n), je(t, e, n))
      : (K && a && Hs(e), (e.flags |= 1), _t(t, e, l, n), e.child)
  );
}
function Tr(t, e, l, a, n, u) {
  return (
    Ul(e),
    (e.updateQueue = null),
    (l = zd(e, a, l, n)),
    Cd(t),
    (a = Vs()),
    t !== null && !Tt
      ? (ks(t, e, u), je(t, e, u))
      : (K && a && Hs(e), (e.flags |= 1), _t(t, e, l, u), e.child)
  );
}
function Rr(t, e, l, a, n) {
  if ((Ul(e), e.stateNode === null)) {
    var u = la,
      i = l.contextType;
    (typeof i == "object" && i !== null && (u = Ut(i)),
      (u = new l(a, u)),
      (e.memoizedState =
        u.state !== null && u.state !== void 0 ? u.state : null),
      (u.updater = Gc),
      (e.stateNode = u),
      (u._reactInternals = e),
      (u = e.stateNode),
      (u.props = a),
      (u.state = e.memoizedState),
      (u.refs = {}),
      Ys(e),
      (i = l.contextType),
      (u.context = typeof i == "object" && i !== null ? Ut(i) : la),
      (u.state = e.memoizedState),
      (i = l.getDerivedStateFromProps),
      typeof i == "function" && (ki(e, l, i, a), (u.state = e.memoizedState)),
      typeof l.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((i = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" &&
          u.UNSAFE_componentWillMount(),
        i !== u.state && Gc.enqueueReplaceState(u, u.state, null),
        un(e, a, u, n),
        nn(),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount == "function" && (e.flags |= 4194308),
      (a = !0));
  } else if (t === null) {
    u = e.stateNode;
    var c = e.memoizedProps,
      s = wl(l, c);
    u.props = s;
    var f = u.context,
      d = l.contextType;
    ((i = la), typeof d == "object" && d !== null && (i = Ut(d)));
    var y = l.getDerivedStateFromProps;
    ((d =
      typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function"),
      (c = e.pendingProps !== c),
      d ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((c || f !== i) && br(e, u, a, i)),
      (Ke = !1));
    var m = e.memoizedState;
    ((u.state = m),
      un(e, a, u, n),
      nn(),
      (f = e.memoizedState),
      c || m !== f || Ke
        ? (typeof y == "function" && (ki(e, l, y, a), (f = e.memoizedState)),
          (s = Ke || vr(e, l, s, a, m, f, i))
            ? (d ||
                (typeof u.UNSAFE_componentWillMount != "function" &&
                  typeof u.componentWillMount != "function") ||
                (typeof u.componentWillMount == "function" &&
                  u.componentWillMount(),
                typeof u.UNSAFE_componentWillMount == "function" &&
                  u.UNSAFE_componentWillMount()),
              typeof u.componentDidMount == "function" && (e.flags |= 4194308))
            : (typeof u.componentDidMount == "function" && (e.flags |= 4194308),
              (e.memoizedProps = a),
              (e.memoizedState = f)),
          (u.props = a),
          (u.state = f),
          (u.context = i),
          (a = s))
        : (typeof u.componentDidMount == "function" && (e.flags |= 4194308),
          (a = !1)));
  } else {
    ((u = e.stateNode),
      Hc(t, e),
      (i = e.memoizedProps),
      (d = wl(l, i)),
      (u.props = d),
      (y = e.pendingProps),
      (m = u.context),
      (f = l.contextType),
      (s = la),
      typeof f == "object" && f !== null && (s = Ut(f)),
      (c = l.getDerivedStateFromProps),
      (f =
        typeof c == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function") ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((i !== y || m !== s) && br(e, u, a, s)),
      (Ke = !1),
      (m = e.memoizedState),
      (u.state = m),
      un(e, a, u, n),
      nn());
    var p = e.memoizedState;
    i !== y ||
    m !== p ||
    Ke ||
    (t !== null && t.dependencies !== null && Hu(t.dependencies))
      ? (typeof c == "function" && (ki(e, l, c, a), (p = e.memoizedState)),
        (d =
          Ke ||
          vr(e, l, d, a, m, p, s) ||
          (t !== null && t.dependencies !== null && Hu(t.dependencies)))
          ? (f ||
              (typeof u.UNSAFE_componentWillUpdate != "function" &&
                typeof u.componentWillUpdate != "function") ||
              (typeof u.componentWillUpdate == "function" &&
                u.componentWillUpdate(a, p, s),
              typeof u.UNSAFE_componentWillUpdate == "function" &&
                u.UNSAFE_componentWillUpdate(a, p, s)),
            typeof u.componentDidUpdate == "function" && (e.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
          : (typeof u.componentDidUpdate != "function" ||
              (i === t.memoizedProps && m === t.memoizedState) ||
              (e.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" ||
              (i === t.memoizedProps && m === t.memoizedState) ||
              (e.flags |= 1024),
            (e.memoizedProps = a),
            (e.memoizedState = p)),
        (u.props = a),
        (u.state = p),
        (u.context = s),
        (a = d))
      : (typeof u.componentDidUpdate != "function" ||
          (i === t.memoizedProps && m === t.memoizedState) ||
          (e.flags |= 4),
        typeof u.getSnapshotBeforeUpdate != "function" ||
          (i === t.memoizedProps && m === t.memoizedState) ||
          (e.flags |= 1024),
        (a = !1));
  }
  return (
    (u = a),
    bu(t, e),
    (a = (e.flags & 128) !== 0),
    u || a
      ? ((u = e.stateNode),
        (l =
          a && typeof l.getDerivedStateFromError != "function"
            ? null
            : u.render()),
        (e.flags |= 1),
        t !== null && a
          ? ((e.child = Sa(e, t.child, null, n)), (e.child = Sa(e, null, l, n)))
          : _t(t, e, l, n),
        (e.memoizedState = u.state),
        (t = e.child))
      : (t = je(t, e, n)),
    t
  );
}
function _r(t, e, l, a) {
  return (wn(), (e.flags |= 256), _t(t, e, l, a), e.child);
}
var Zi = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function Ki(t) {
  return { baseLanes: t, cachePool: Rd() };
}
function Ji(t, e, l) {
  return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= se), t);
}
function bm(t, e, l) {
  var a = e.pendingProps,
    n = !1,
    u = (e.flags & 128) !== 0,
    i;
  if (
    ((i = u) ||
      (i =
        t !== null && t.memoizedState === null ? !1 : (vt.current & 2) !== 0),
    i && ((n = !0), (e.flags &= -129)),
    (i = (e.flags & 32) !== 0),
    (e.flags &= -33),
    t === null)
  ) {
    if (K) {
      if ((n ? $e(e) : Fe(), K)) {
        var c = ft,
          s;
        if ((s = c)) {
          t: {
            for (s = c, c = pe; s.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break t;
              }
              if (((s = de(s.nextSibling)), s === null)) {
                c = null;
                break t;
              }
            }
            c = s;
          }
          c !== null
            ? ((e.memoizedState = {
                dehydrated: c,
                treeContext: Rl !== null ? { id: ze, overflow: Ue } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (s = $t(18, null, null, 0)),
              (s.stateNode = c),
              (s.return = e),
              (e.child = s),
              (wt = e),
              (ft = null),
              (s = !0))
            : (s = !1);
        }
        s || zl(e);
      }
      if (
        ((c = e.memoizedState), c !== null && ((c = c.dehydrated), c !== null))
      )
        return (ns(c) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      we(e);
    }
    return (
      (c = a.children),
      (a = a.fallback),
      n
        ? (Fe(),
          (n = e.mode),
          (c = Vu({ mode: "hidden", children: c }, n)),
          (a = Tl(a, n, l, null)),
          (c.return = e),
          (a.return = e),
          (c.sibling = a),
          (e.child = c),
          (n = e.child),
          (n.memoizedState = Ki(l)),
          (n.childLanes = Ji(t, i, l)),
          (e.memoizedState = Zi),
          a)
        : ($e(e), kc(e, c))
    );
  }
  if (((s = t.memoizedState), s !== null && ((c = s.dehydrated), c !== null))) {
    if (u)
      e.flags & 256
        ? ($e(e), (e.flags &= -257), (e = $i(t, e, l)))
        : e.memoizedState !== null
          ? (Fe(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (Fe(),
            (n = a.fallback),
            (c = e.mode),
            (a = Vu({ mode: "visible", children: a.children }, c)),
            (n = Tl(n, c, l, null)),
            (n.flags |= 2),
            (a.return = e),
            (n.return = e),
            (a.sibling = n),
            (e.child = a),
            Sa(e, t.child, null, l),
            (a = e.child),
            (a.memoizedState = Ki(l)),
            (a.childLanes = Ji(t, i, l)),
            (e.memoizedState = Zi),
            (e = n));
    else if (($e(e), ns(c))) {
      if (((i = c.nextSibling && c.nextSibling.dataset), i)) var f = i.dgst;
      ((i = f),
        (a = Error(E(419))),
        (a.stack = ""),
        (a.digest = i),
        gn({ value: a, source: null, stack: null }),
        (e = $i(t, e, l)));
    } else if (
      (Tt || Bn(t, e, l, !1), (i = (l & t.childLanes) !== 0), Tt || i)
    ) {
      if (
        ((i = lt),
        i !== null &&
          ((a = l & -l),
          (a = a & 42 ? 1 : Ts(a)),
          (a = a & (i.suspendedLanes | l) ? 0 : a),
          a !== 0 && a !== s.retryLane))
      )
        throw ((s.retryLane = a), Ca(t, a), It(i, t, a), pm);
      (c.data === "$?" || Wc(), (e = $i(t, e, l)));
    } else
      c.data === "$?"
        ? ((e.flags |= 192), (e.child = t.child), (e = null))
        : ((t = s.treeContext),
          (ft = de(c.nextSibling)),
          (wt = e),
          (K = !0),
          (_l = null),
          (pe = !1),
          t !== null &&
            ((ne[ue++] = ze),
            (ne[ue++] = Ue),
            (ne[ue++] = Rl),
            (ze = t.id),
            (Ue = t.overflow),
            (Rl = e)),
          (e = kc(e, a.children)),
          (e.flags |= 4096));
    return e;
  }
  return n
    ? (Fe(),
      (n = a.fallback),
      (c = e.mode),
      (s = t.child),
      (f = s.sibling),
      (a = Be(s, { mode: "hidden", children: a.children })),
      (a.subtreeFlags = s.subtreeFlags & 65011712),
      f !== null ? (n = Be(f, n)) : ((n = Tl(n, c, l, null)), (n.flags |= 2)),
      (n.return = e),
      (a.return = e),
      (a.sibling = n),
      (e.child = a),
      (a = n),
      (n = e.child),
      (c = t.child.memoizedState),
      c === null
        ? (c = Ki(l))
        : ((s = c.cachePool),
          s !== null
            ? ((f = gt._currentValue),
              (s = s.parent !== f ? { parent: f, pool: f } : s))
            : (s = Rd()),
          (c = { baseLanes: c.baseLanes | l, cachePool: s })),
      (n.memoizedState = c),
      (n.childLanes = Ji(t, i, l)),
      (e.memoizedState = Zi),
      a)
    : ($e(e),
      (l = t.child),
      (t = l.sibling),
      (l = Be(l, { mode: "visible", children: a.children })),
      (l.return = e),
      (l.sibling = null),
      t !== null &&
        ((i = e.deletions),
        i === null ? ((e.deletions = [t]), (e.flags |= 16)) : i.push(t)),
      (e.child = l),
      (e.memoizedState = null),
      l);
}
function kc(t, e) {
  return (
    (e = Vu({ mode: "visible", children: e }, t.mode)),
    (e.return = t),
    (t.child = e)
  );
}
function Vu(t, e) {
  return (
    (t = $t(22, t, null, e)),
    (t.lanes = 0),
    (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
    }),
    t
  );
}
function $i(t, e, l) {
  return (
    Sa(e, t.child, null, l),
    (t = kc(e, e.pendingProps.children)),
    (t.flags |= 2),
    (e.memoizedState = null),
    t
  );
}
function Dr(t, e, l) {
  t.lanes |= e;
  var a = t.alternate;
  (a !== null && (a.lanes |= e), Uc(t.return, e, l));
}
function Fi(t, e, l, a, n) {
  var u = t.memoizedState;
  u === null
    ? (t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: l,
        tailMode: n,
      })
    : ((u.isBackwards = e),
      (u.rendering = null),
      (u.renderingStartTime = 0),
      (u.last = a),
      (u.tail = l),
      (u.tailMode = n));
}
function Sm(t, e, l) {
  var a = e.pendingProps,
    n = a.revealOrder,
    u = a.tail;
  if ((_t(t, e, a.children, l), (a = vt.current), a & 2))
    ((a = (a & 1) | 2), (e.flags |= 128));
  else {
    if (t !== null && t.flags & 128)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Dr(t, l, e);
        else if (t.tag === 19) Dr(t, l, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    a &= 1;
  }
  switch ((it(vt, a), n)) {
    case "forwards":
      for (l = e.child, n = null; l !== null; )
        ((t = l.alternate),
          t !== null && Xu(t) === null && (n = l),
          (l = l.sibling));
      ((l = n),
        l === null
          ? ((n = e.child), (e.child = null))
          : ((n = l.sibling), (l.sibling = null)),
        Fi(e, !1, n, l, u));
      break;
    case "backwards":
      for (l = null, n = e.child, e.child = null; n !== null; ) {
        if (((t = n.alternate), t !== null && Xu(t) === null)) {
          e.child = n;
          break;
        }
        ((t = n.sibling), (n.sibling = l), (l = n), (n = t));
      }
      Fi(e, !0, l, null, u);
      break;
    case "together":
      Fi(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function je(t, e, l) {
  if (
    (t !== null && (e.dependencies = t.dependencies),
    (dl |= e.lanes),
    !(l & e.childLanes))
  )
    if (t !== null) {
      if ((Bn(t, e, l, !1), (l & e.childLanes) === 0)) return null;
    } else return null;
  if (t !== null && e.child !== t.child) throw Error(E(153));
  if (e.child !== null) {
    for (
      t = e.child, l = Be(t, t.pendingProps), e.child = l, l.return = e;
      t.sibling !== null;
    )
      ((t = t.sibling),
        (l = l.sibling = Be(t, t.pendingProps)),
        (l.return = e));
    l.sibling = null;
  }
  return e.child;
}
function tf(t, e) {
  return t.lanes & e ? !0 : ((t = t.dependencies), !!(t !== null && Hu(t)));
}
function Ky(t, e, l) {
  switch (e.tag) {
    case 3:
      (Mu(e, e.stateNode.containerInfo),
        Je(e, gt, t.memoizedState.cache),
        wn());
      break;
    case 27:
    case 5:
      Sc(e);
      break;
    case 4:
      Mu(e, e.stateNode.containerInfo);
      break;
    case 10:
      Je(e, e.type, e.memoizedProps.value);
      break;
    case 13:
      var a = e.memoizedState;
      if (a !== null)
        return a.dehydrated !== null
          ? ($e(e), (e.flags |= 128), null)
          : l & e.child.childLanes
            ? bm(t, e, l)
            : ($e(e), (t = je(t, e, l)), t !== null ? t.sibling : null);
      $e(e);
      break;
    case 19:
      var n = (t.flags & 128) !== 0;
      if (
        ((a = (l & e.childLanes) !== 0),
        a || (Bn(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
        n)
      ) {
        if (a) return Sm(t, e, l);
        e.flags |= 128;
      }
      if (
        ((n = e.memoizedState),
        n !== null &&
          ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
        it(vt, vt.current),
        a)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((e.lanes = 0), vm(t, e, l));
    case 24:
      Je(e, gt, t.memoizedState.cache);
  }
  return je(t, e, l);
}
function Em(t, e, l) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps) Tt = !0;
    else {
      if (!tf(t, l) && !(e.flags & 128)) return ((Tt = !1), Ky(t, e, l));
      Tt = !!(t.flags & 131072);
    }
  else ((Tt = !1), K && e.flags & 1048576 && Od(e, Bu, e.index));
  switch (((e.lanes = 0), e.tag)) {
    case 16:
      t: {
        t = e.pendingProps;
        var a = e.elementType,
          n = a._init;
        if (((a = n(a._payload)), (e.type = a), typeof a == "function"))
          Bs(a)
            ? ((t = wl(a, t)), (e.tag = 1), (e = Rr(null, e, a, t, l)))
            : ((e.tag = 0), (e = Vc(null, e, a, t, l)));
        else {
          if (a != null) {
            if (((n = a.$$typeof), n === Es)) {
              ((e.tag = 11), (e = Er(null, e, a, t, l)));
              break t;
            } else if (n === As) {
              ((e.tag = 14), (e = Ar(null, e, a, t, l)));
              break t;
            }
          }
          throw ((e = vc(a) || a), Error(E(306, e, "")));
        }
      }
      return e;
    case 0:
      return Vc(t, e, e.type, e.pendingProps, l);
    case 1:
      return ((a = e.type), (n = wl(a, e.pendingProps)), Rr(t, e, a, n, l));
    case 3:
      t: {
        if ((Mu(e, e.stateNode.containerInfo), t === null)) throw Error(E(387));
        a = e.pendingProps;
        var u = e.memoizedState;
        ((n = u.element), Hc(t, e), un(e, a, null, l));
        var i = e.memoizedState;
        if (
          ((a = i.cache),
          Je(e, gt, a),
          a !== u.cache && xc(e, [gt], l, !0),
          nn(),
          (a = i.element),
          u.isDehydrated)
        )
          if (
            ((u = { element: a, isDehydrated: !1, cache: i.cache }),
            (e.updateQueue.baseState = u),
            (e.memoizedState = u),
            e.flags & 256)
          ) {
            e = _r(t, e, a, l);
            break t;
          } else if (a !== n) {
            ((n = ce(Error(E(424)), e)), gn(n), (e = _r(t, e, a, l)));
            break t;
          } else {
            switch (((t = e.stateNode.containerInfo), t.nodeType)) {
              case 9:
                t = t.body;
                break;
              default:
                t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
            }
            for (
              ft = de(t.firstChild),
                wt = e,
                K = !0,
                _l = null,
                pe = !0,
                l = fm(e, null, a, l),
                e.child = l;
              l;
            )
              ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          }
        else {
          if ((wn(), a === n)) {
            e = je(t, e, l);
            break t;
          }
          _t(t, e, a, l);
        }
        e = e.child;
      }
      return e;
    case 26:
      return (
        bu(t, e),
        t === null
          ? (l = Vr(e.type, null, e.pendingProps, null))
            ? (e.memoizedState = l)
            : K ||
              ((l = e.type),
              (t = e.pendingProps),
              (a = Wu(ll.current).createElement(l)),
              (a[zt] = e),
              (a[Gt] = t),
              Nt(a, l, t),
              Ot(a),
              (e.stateNode = a))
          : (e.memoizedState = Vr(
              e.type,
              t.memoizedProps,
              e.pendingProps,
              t.memoizedState,
            )),
        null
      );
    case 27:
      return (
        Sc(e),
        t === null &&
          K &&
          ((a = e.stateNode = ch(e.type, e.pendingProps, ll.current)),
          (wt = e),
          (pe = !0),
          (n = ft),
          hl(e.type) ? ((us = n), (ft = de(a.firstChild))) : (ft = n)),
        _t(t, e, e.pendingProps.children, l),
        bu(t, e),
        t === null && (e.flags |= 4194304),
        e.child
      );
    case 5:
      return (
        t === null &&
          K &&
          ((n = a = ft) &&
            ((a = E1(a, e.type, e.pendingProps, pe)),
            a !== null
              ? ((e.stateNode = a),
                (wt = e),
                (ft = de(a.firstChild)),
                (pe = !1),
                (n = !0))
              : (n = !1)),
          n || zl(e)),
        Sc(e),
        (n = e.type),
        (u = e.pendingProps),
        (i = t !== null ? t.memoizedProps : null),
        (a = u.children),
        ls(n, u) ? (a = null) : i !== null && ls(n, i) && (e.flags |= 32),
        e.memoizedState !== null &&
          ((n = Qs(t, e, jy, null, null, l)), (On._currentValue = n)),
        bu(t, e),
        _t(t, e, a, l),
        e.child
      );
    case 6:
      return (
        t === null &&
          K &&
          ((t = l = ft) &&
            ((l = A1(l, e.pendingProps, pe)),
            l !== null
              ? ((e.stateNode = l), (wt = e), (ft = null), (t = !0))
              : (t = !1)),
          t || zl(e)),
        null
      );
    case 13:
      return bm(t, e, l);
    case 4:
      return (
        Mu(e, e.stateNode.containerInfo),
        (a = e.pendingProps),
        t === null ? (e.child = Sa(e, null, a, l)) : _t(t, e, a, l),
        e.child
      );
    case 11:
      return Er(t, e, e.type, e.pendingProps, l);
    case 7:
      return (_t(t, e, e.pendingProps, l), e.child);
    case 8:
      return (_t(t, e, e.pendingProps.children, l), e.child);
    case 12:
      return (_t(t, e, e.pendingProps.children, l), e.child);
    case 10:
      return (
        (a = e.pendingProps),
        Je(e, e.type, a.value),
        _t(t, e, a.children, l),
        e.child
      );
    case 9:
      return (
        (n = e.type._context),
        (a = e.pendingProps.children),
        Ul(e),
        (n = Ut(n)),
        (a = a(n)),
        (e.flags |= 1),
        _t(t, e, a, l),
        e.child
      );
    case 14:
      return Ar(t, e, e.type, e.pendingProps, l);
    case 15:
      return gm(t, e, e.type, e.pendingProps, l);
    case 19:
      return Sm(t, e, l);
    case 31:
      return (
        (a = e.pendingProps),
        (l = e.mode),
        (a = { mode: a.mode, children: a.children }),
        t === null
          ? ((l = Vu(a, l)),
            (l.ref = e.ref),
            (e.child = l),
            (l.return = e),
            (e = l))
          : ((l = Be(t.child, a)),
            (l.ref = e.ref),
            (e.child = l),
            (l.return = e),
            (e = l)),
        e
      );
    case 22:
      return vm(t, e, l);
    case 24:
      return (
        Ul(e),
        (a = Ut(gt)),
        t === null
          ? ((n = js()),
            n === null &&
              ((n = lt),
              (u = Ls()),
              (n.pooledCache = u),
              u.refCount++,
              u !== null && (n.pooledCacheLanes |= l),
              (n = u)),
            (e.memoizedState = { parent: a, cache: n }),
            Ys(e),
            Je(e, gt, n))
          : (t.lanes & l && (Hc(t, e), un(e, null, null, l), nn()),
            (n = t.memoizedState),
            (u = e.memoizedState),
            n.parent !== a
              ? ((n = { parent: a, cache: a }),
                (e.memoizedState = n),
                e.lanes === 0 &&
                  (e.memoizedState = e.updateQueue.baseState = n),
                Je(e, gt, a))
              : ((a = u.cache),
                Je(e, gt, a),
                a !== n.cache && xc(e, [gt], l, !0))),
        _t(t, e, e.pendingProps.children, l),
        e.child
      );
    case 29:
      throw e.pendingProps;
  }
  throw Error(E(156, e.tag));
}
function De(t) {
  t.flags |= 4;
}
function Mr(t, e) {
  if (e.type !== "stylesheet" || e.state.loading & 4) t.flags &= -16777217;
  else if (((t.flags |= 16777216), !rh(e))) {
    if (
      ((e = fe.current),
      e !== null &&
        ((V & 4194048) === V
          ? Se !== null
          : ((V & 62914560) !== V && !(V & 536870912)) || e !== Se))
    )
      throw ((ln = Bc), _d);
    t.flags |= 8192;
  }
}
function uu(t, e) {
  (e !== null && (t.flags |= 4),
    t.flags & 16384 &&
      ((e = t.tag !== 22 ? Ko() : 536870912), (t.lanes |= e), (Ea |= e)));
}
function Ga(t, e) {
  if (!K)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var l = null; e !== null; )
          (e.alternate !== null && (l = e), (e = e.sibling));
        l === null ? (t.tail = null) : (l.sibling = null);
        break;
      case "collapsed":
        l = t.tail;
        for (var a = null; l !== null; )
          (l.alternate !== null && (a = l), (l = l.sibling));
        a === null
          ? e || t.tail === null
            ? (t.tail = null)
            : (t.tail.sibling = null)
          : (a.sibling = null);
    }
}
function ct(t) {
  var e = t.alternate !== null && t.alternate.child === t.child,
    l = 0,
    a = 0;
  if (e)
    for (var n = t.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags & 65011712),
        (a |= n.flags & 65011712),
        (n.return = t),
        (n = n.sibling));
  else
    for (n = t.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags),
        (a |= n.flags),
        (n.return = t),
        (n = n.sibling));
  return ((t.subtreeFlags |= a), (t.childLanes = l), e);
}
function Jy(t, e, l) {
  var a = e.pendingProps;
  switch ((qs(e), e.tag)) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ct(e), null);
    case 1:
      return (ct(e), null);
    case 3:
      return (
        (l = e.stateNode),
        (a = null),
        t !== null && (a = t.memoizedState.cache),
        e.memoizedState.cache !== a && (e.flags |= 2048),
        He(gt),
        ha(),
        l.pendingContext &&
          ((l.context = l.pendingContext), (l.pendingContext = null)),
        (t === null || t.child === null) &&
          (Ya(e)
            ? De(e)
            : t === null ||
              (t.memoizedState.isDehydrated && !(e.flags & 256)) ||
              ((e.flags |= 1024), nr())),
        ct(e),
        null
      );
    case 26:
      return (
        (l = e.memoizedState),
        t === null
          ? (De(e),
            l !== null ? (ct(e), Mr(e, l)) : (ct(e), (e.flags &= -16777217)))
          : l
            ? l !== t.memoizedState
              ? (De(e), ct(e), Mr(e, l))
              : (ct(e), (e.flags &= -16777217))
            : (t.memoizedProps !== a && De(e), ct(e), (e.flags &= -16777217)),
        null
      );
    case 27:
      (Nu(e), (l = ll.current));
      var n = e.type;
      if (t !== null && e.stateNode != null) t.memoizedProps !== a && De(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(E(166));
          return (ct(e), null);
        }
        ((t = ve.current),
          Ya(e) ? lr(e) : ((t = ch(n, a, l)), (e.stateNode = t), De(e)));
      }
      return (ct(e), null);
    case 5:
      if ((Nu(e), (l = e.type), t !== null && e.stateNode != null))
        t.memoizedProps !== a && De(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(E(166));
          return (ct(e), null);
        }
        if (((t = ve.current), Ya(e))) lr(e);
        else {
          switch (((n = Wu(ll.current)), t)) {
            case 1:
              t = n.createElementNS("http://www.w3.org/2000/svg", l);
              break;
            case 2:
              t = n.createElementNS("http://www.w3.org/1998/Math/MathML", l);
              break;
            default:
              switch (l) {
                case "svg":
                  t = n.createElementNS("http://www.w3.org/2000/svg", l);
                  break;
                case "math":
                  t = n.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    l,
                  );
                  break;
                case "script":
                  ((t = n.createElement("div")),
                    (t.innerHTML = "<script><\/script>"),
                    (t = t.removeChild(t.firstChild)));
                  break;
                case "select":
                  ((t =
                    typeof a.is == "string"
                      ? n.createElement("select", { is: a.is })
                      : n.createElement("select")),
                    a.multiple
                      ? (t.multiple = !0)
                      : a.size && (t.size = a.size));
                  break;
                default:
                  t =
                    typeof a.is == "string"
                      ? n.createElement(l, { is: a.is })
                      : n.createElement(l);
              }
          }
          ((t[zt] = e), (t[Gt] = a));
          t: for (n = e.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === e) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break t;
              n = n.return;
            }
            ((n.sibling.return = n.return), (n = n.sibling));
          }
          e.stateNode = t;
          t: switch ((Nt(t, l, a), l)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              t = !!a.autoFocus;
              break t;
            case "img":
              t = !0;
              break t;
            default:
              t = !1;
          }
          t && De(e);
        }
      }
      return (ct(e), (e.flags &= -16777217), null);
    case 6:
      if (t && e.stateNode != null) t.memoizedProps !== a && De(e);
      else {
        if (typeof a != "string" && e.stateNode === null) throw Error(E(166));
        if (((t = ll.current), Ya(e))) {
          if (
            ((t = e.stateNode),
            (l = e.memoizedProps),
            (a = null),
            (n = wt),
            n !== null)
          )
            switch (n.tag) {
              case 27:
              case 5:
                a = n.memoizedProps;
            }
          ((t[zt] = e),
            (t = !!(
              t.nodeValue === l ||
              (a !== null && a.suppressHydrationWarning === !0) ||
              nh(t.nodeValue, l)
            )),
            t || zl(e));
        } else ((t = Wu(t).createTextNode(a)), (t[zt] = e), (e.stateNode = t));
      }
      return (ct(e), null);
    case 13:
      if (
        ((a = e.memoizedState),
        t === null ||
          (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
      ) {
        if (((n = Ya(e)), a !== null && a.dehydrated !== null)) {
          if (t === null) {
            if (!n) throw Error(E(318));
            if (
              ((n = e.memoizedState),
              (n = n !== null ? n.dehydrated : null),
              !n)
            )
              throw Error(E(317));
            n[zt] = e;
          } else
            (wn(),
              !(e.flags & 128) && (e.memoizedState = null),
              (e.flags |= 4));
          (ct(e), (n = !1));
        } else
          ((n = nr()),
            t !== null &&
              t.memoizedState !== null &&
              (t.memoizedState.hydrationErrors = n),
            (n = !0));
        if (!n) return e.flags & 256 ? (we(e), e) : (we(e), null);
      }
      if ((we(e), e.flags & 128)) return ((e.lanes = l), e);
      if (((l = a !== null), (t = t !== null && t.memoizedState !== null), l)) {
        ((a = e.child),
          (n = null),
          a.alternate !== null &&
            a.alternate.memoizedState !== null &&
            a.alternate.memoizedState.cachePool !== null &&
            (n = a.alternate.memoizedState.cachePool.pool));
        var u = null;
        (a.memoizedState !== null &&
          a.memoizedState.cachePool !== null &&
          (u = a.memoizedState.cachePool.pool),
          u !== n && (a.flags |= 2048));
      }
      return (
        l !== t && l && (e.child.flags |= 8192),
        uu(e, e.updateQueue),
        ct(e),
        null
      );
    case 4:
      return (ha(), t === null && ff(e.stateNode.containerInfo), ct(e), null);
    case 10:
      return (He(e.type), ct(e), null);
    case 19:
      if ((Rt(vt), (n = e.memoizedState), n === null)) return (ct(e), null);
      if (((a = (e.flags & 128) !== 0), (u = n.rendering), u === null))
        if (a) Ga(n, !1);
        else {
          if (rt !== 0 || (t !== null && t.flags & 128))
            for (t = e.child; t !== null; ) {
              if (((u = Xu(t)), u !== null)) {
                for (
                  e.flags |= 128,
                    Ga(n, !1),
                    t = u.updateQueue,
                    e.updateQueue = t,
                    uu(e, t),
                    e.subtreeFlags = 0,
                    t = l,
                    l = e.child;
                  l !== null;
                )
                  (Ad(l, t), (l = l.sibling));
                return (it(vt, (vt.current & 1) | 2), e.child);
              }
              t = t.sibling;
            }
          n.tail !== null &&
            be() > Zu &&
            ((e.flags |= 128), (a = !0), Ga(n, !1), (e.lanes = 4194304));
        }
      else {
        if (!a)
          if (((t = Xu(u)), t !== null)) {
            if (
              ((e.flags |= 128),
              (a = !0),
              (t = t.updateQueue),
              (e.updateQueue = t),
              uu(e, t),
              Ga(n, !0),
              n.tail === null && n.tailMode === "hidden" && !u.alternate && !K)
            )
              return (ct(e), null);
          } else
            2 * be() - n.renderingStartTime > Zu &&
              l !== 536870912 &&
              ((e.flags |= 128), (a = !0), Ga(n, !1), (e.lanes = 4194304));
        n.isBackwards
          ? ((u.sibling = e.child), (e.child = u))
          : ((t = n.last),
            t !== null ? (t.sibling = u) : (e.child = u),
            (n.last = u));
      }
      return n.tail !== null
        ? ((e = n.tail),
          (n.rendering = e),
          (n.tail = e.sibling),
          (n.renderingStartTime = be()),
          (e.sibling = null),
          (t = vt.current),
          it(vt, a ? (t & 1) | 2 : t & 1),
          e)
        : (ct(e), null);
    case 22:
    case 23:
      return (
        we(e),
        Xs(),
        (a = e.memoizedState !== null),
        t !== null
          ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
          : a && (e.flags |= 8192),
        a
          ? l & 536870912 &&
            !(e.flags & 128) &&
            (ct(e), e.subtreeFlags & 6 && (e.flags |= 8192))
          : ct(e),
        (l = e.updateQueue),
        l !== null && uu(e, l.retryQueue),
        (l = null),
        t !== null &&
          t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (l = t.memoizedState.cachePool.pool),
        (a = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (a = e.memoizedState.cachePool.pool),
        a !== l && (e.flags |= 2048),
        t !== null && Rt(Dl),
        null
      );
    case 24:
      return (
        (l = null),
        t !== null && (l = t.memoizedState.cache),
        e.memoizedState.cache !== l && (e.flags |= 2048),
        He(gt),
        ct(e),
        null
      );
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(E(156, e.tag));
}
function $y(t, e) {
  switch ((qs(e), e.tag)) {
    case 1:
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 3:
      return (
        He(gt),
        ha(),
        (t = e.flags),
        t & 65536 && !(t & 128) ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 26:
    case 27:
    case 5:
      return (Nu(e), null);
    case 13:
      if ((we(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
        if (e.alternate === null) throw Error(E(340));
        wn();
      }
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 19:
      return (Rt(vt), null);
    case 4:
      return (ha(), null);
    case 10:
      return (He(e.type), null);
    case 22:
    case 23:
      return (
        we(e),
        Xs(),
        t !== null && Rt(Dl),
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 24:
      return (He(gt), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function Am(t, e) {
  switch ((qs(e), e.tag)) {
    case 3:
      (He(gt), ha());
      break;
    case 26:
    case 27:
    case 5:
      Nu(e);
      break;
    case 4:
      ha();
      break;
    case 13:
      we(e);
      break;
    case 19:
      Rt(vt);
      break;
    case 10:
      He(e.type);
      break;
    case 22:
    case 23:
      (we(e), Xs(), t !== null && Rt(Dl));
      break;
    case 24:
      He(gt);
  }
}
function Yn(t, e) {
  try {
    var l = e.updateQueue,
      a = l !== null ? l.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      l = n;
      do {
        if ((l.tag & t) === t) {
          a = void 0;
          var u = l.create,
            i = l.inst;
          ((a = u()), (i.destroy = a));
        }
        l = l.next;
      } while (l !== n);
    }
  } catch (c) {
    et(e, e.return, c);
  }
}
function ol(t, e, l) {
  try {
    var a = e.updateQueue,
      n = a !== null ? a.lastEffect : null;
    if (n !== null) {
      var u = n.next;
      a = u;
      do {
        if ((a.tag & t) === t) {
          var i = a.inst,
            c = i.destroy;
          if (c !== void 0) {
            ((i.destroy = void 0), (n = e));
            var s = l,
              f = c;
            try {
              f();
            } catch (d) {
              et(n, s, d);
            }
          }
        }
        a = a.next;
      } while (a !== u);
    }
  } catch (d) {
    et(e, e.return, d);
  }
}
function Om(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var l = t.stateNode;
    try {
      Nd(e, l);
    } catch (a) {
      et(t, t.return, a);
    }
  }
}
function Tm(t, e, l) {
  ((l.props = wl(t.type, t.memoizedProps)), (l.state = t.memoizedState));
  try {
    l.componentWillUnmount();
  } catch (a) {
    et(t, e, a);
  }
}
function sn(t, e) {
  try {
    var l = t.ref;
    if (l !== null) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          var a = t.stateNode;
          break;
        case 30:
          a = t.stateNode;
          break;
        default:
          a = t.stateNode;
      }
      typeof l == "function" ? (t.refCleanup = l(a)) : (l.current = a);
    }
  } catch (n) {
    et(t, e, n);
  }
}
function ge(t, e) {
  var l = t.ref,
    a = t.refCleanup;
  if (l !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (n) {
        et(t, e, n);
      } finally {
        ((t.refCleanup = null),
          (t = t.alternate),
          t != null && (t.refCleanup = null));
      }
    else if (typeof l == "function")
      try {
        l(null);
      } catch (n) {
        et(t, e, n);
      }
    else l.current = null;
}
function Rm(t) {
  var e = t.type,
    l = t.memoizedProps,
    a = t.stateNode;
  try {
    t: switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        l.autoFocus && a.focus();
        break t;
      case "img":
        l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
    }
  } catch (n) {
    et(t, t.return, n);
  }
}
function Wi(t, e, l) {
  try {
    var a = t.stateNode;
    (p1(a, t.type, l, e), (a[Gt] = e));
  } catch (n) {
    et(t, t.return, n);
  }
}
function _m(t) {
  return (
    t.tag === 5 ||
    t.tag === 3 ||
    t.tag === 26 ||
    (t.tag === 27 && hl(t.type)) ||
    t.tag === 4
  );
}
function Pi(t) {
  t: for (;;) {
    for (; t.sibling === null; ) {
      if (t.return === null || _m(t.return)) return null;
      t = t.return;
    }
    for (
      t.sibling.return = t.return, t = t.sibling;
      t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
    ) {
      if (
        (t.tag === 27 && hl(t.type)) ||
        t.flags & 2 ||
        t.child === null ||
        t.tag === 4
      )
        continue t;
      ((t.child.return = t), (t = t.child));
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function Zc(t, e, l) {
  var a = t.tag;
  if (a === 5 || a === 6)
    ((t = t.stateNode),
      e
        ? (l.nodeType === 9
            ? l.body
            : l.nodeName === "HTML"
              ? l.ownerDocument.body
              : l
          ).insertBefore(t, e)
        : ((e =
            l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l),
          e.appendChild(t),
          (l = l._reactRootContainer),
          l != null || e.onclick !== null || (e.onclick = Ai)));
  else if (
    a !== 4 &&
    (a === 27 && hl(t.type) && ((l = t.stateNode), (e = null)),
    (t = t.child),
    t !== null)
  )
    for (Zc(t, e, l), t = t.sibling; t !== null; )
      (Zc(t, e, l), (t = t.sibling));
}
function ku(t, e, l) {
  var a = t.tag;
  if (a === 5 || a === 6)
    ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
  else if (
    a !== 4 &&
    (a === 27 && hl(t.type) && (l = t.stateNode), (t = t.child), t !== null)
  )
    for (ku(t, e, l), t = t.sibling; t !== null; )
      (ku(t, e, l), (t = t.sibling));
}
function Dm(t) {
  var e = t.stateNode,
    l = t.memoizedProps;
  try {
    for (var a = t.type, n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    (Nt(e, a, l), (e[zt] = t), (e[Gt] = l));
  } catch (u) {
    et(t, t.return, u);
  }
}
var Ne = !1,
  mt = !1,
  Ii = !1,
  Nr = typeof WeakSet == "function" ? WeakSet : Set,
  At = null;
function Fy(t, e) {
  if (((t = t.containerInfo), (ts = ei), (t = hd(t)), Us(t))) {
    if ("selectionStart" in t)
      var l = { start: t.selectionStart, end: t.selectionEnd };
    else
      t: {
        l = ((l = t.ownerDocument) && l.defaultView) || window;
        var a = l.getSelection && l.getSelection();
        if (a && a.rangeCount !== 0) {
          l = a.anchorNode;
          var n = a.anchorOffset,
            u = a.focusNode;
          a = a.focusOffset;
          try {
            (l.nodeType, u.nodeType);
          } catch {
            l = null;
            break t;
          }
          var i = 0,
            c = -1,
            s = -1,
            f = 0,
            d = 0,
            y = t,
            m = null;
          e: for (;;) {
            for (
              var p;
              y !== l || (n !== 0 && y.nodeType !== 3) || (c = i + n),
                y !== u || (a !== 0 && y.nodeType !== 3) || (s = i + a),
                y.nodeType === 3 && (i += y.nodeValue.length),
                (p = y.firstChild) !== null;
            )
              ((m = y), (y = p));
            for (;;) {
              if (y === t) break e;
              if (
                (m === l && ++f === n && (c = i),
                m === u && ++d === a && (s = i),
                (p = y.nextSibling) !== null)
              )
                break;
              ((y = m), (m = y.parentNode));
            }
            y = p;
          }
          l = c === -1 || s === -1 ? null : { start: c, end: s };
        } else l = null;
      }
    l = l || { start: 0, end: 0 };
  } else l = null;
  for (
    es = { focusedElem: t, selectionRange: l }, ei = !1, At = e;
    At !== null;
  )
    if (((e = At), (t = e.child), (e.subtreeFlags & 1024) !== 0 && t !== null))
      ((t.return = e), (At = t));
    else
      for (; At !== null; ) {
        switch (((e = At), (u = e.alternate), (t = e.flags), e.tag)) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (t & 1024 && u !== null) {
              ((t = void 0),
                (l = e),
                (n = u.memoizedProps),
                (u = u.memoizedState),
                (a = l.stateNode));
              try {
                var T = wl(l.type, n, l.elementType === l.type);
                ((t = a.getSnapshotBeforeUpdate(T, u)),
                  (a.__reactInternalSnapshotBeforeUpdate = t));
              } catch (A) {
                et(l, l.return, A);
              }
            }
            break;
          case 3:
            if (t & 1024) {
              if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9))
                as(t);
              else if (l === 1)
                switch (t.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    as(t);
                    break;
                  default:
                    t.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (t & 1024) throw Error(E(163));
        }
        if (((t = e.sibling), t !== null)) {
          ((t.return = e.return), (At = t));
          break;
        }
        At = e.return;
      }
}
function Mm(t, e, l) {
  var a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      (Ve(t, l), a & 4 && Yn(5, l));
      break;
    case 1:
      if ((Ve(t, l), a & 4))
        if (((t = l.stateNode), e === null))
          try {
            t.componentDidMount();
          } catch (i) {
            et(l, l.return, i);
          }
        else {
          var n = wl(l.type, e.memoizedProps);
          e = e.memoizedState;
          try {
            t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
          } catch (i) {
            et(l, l.return, i);
          }
        }
      (a & 64 && Om(l), a & 512 && sn(l, l.return));
      break;
    case 3:
      if ((Ve(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
        if (((e = null), l.child !== null))
          switch (l.child.tag) {
            case 27:
            case 5:
              e = l.child.stateNode;
              break;
            case 1:
              e = l.child.stateNode;
          }
        try {
          Nd(t, e);
        } catch (i) {
          et(l, l.return, i);
        }
      }
      break;
    case 27:
      e === null && a & 4 && Dm(l);
    case 26:
    case 5:
      (Ve(t, l), e === null && a & 4 && Rm(l), a & 512 && sn(l, l.return));
      break;
    case 12:
      Ve(t, l);
      break;
    case 13:
      (Ve(t, l),
        a & 4 && zm(t, l),
        a & 64 &&
          ((t = l.memoizedState),
          t !== null &&
            ((t = t.dehydrated),
            t !== null && ((l = u1.bind(null, l)), O1(t, l)))));
      break;
    case 22:
      if (((a = l.memoizedState !== null || Ne), !a)) {
        ((e = (e !== null && e.memoizedState !== null) || mt), (n = Ne));
        var u = mt;
        ((Ne = a),
          (mt = e) && !u ? ke(t, l, (l.subtreeFlags & 8772) !== 0) : Ve(t, l),
          (Ne = n),
          (mt = u));
      }
      break;
    case 30:
      break;
    default:
      Ve(t, l);
  }
}
function Nm(t) {
  var e = t.alternate;
  (e !== null && ((t.alternate = null), Nm(e)),
    (t.child = null),
    (t.deletions = null),
    (t.sibling = null),
    t.tag === 5 && ((e = t.stateNode), e !== null && _s(e)),
    (t.stateNode = null),
    (t.return = null),
    (t.dependencies = null),
    (t.memoizedProps = null),
    (t.memoizedState = null),
    (t.pendingProps = null),
    (t.stateNode = null),
    (t.updateQueue = null));
}
var nt = null,
  jt = !1;
function Me(t, e, l) {
  for (l = l.child; l !== null; ) (Cm(t, e, l), (l = l.sibling));
}
function Cm(t, e, l) {
  if (Ft && typeof Ft.onCommitFiberUnmount == "function")
    try {
      Ft.onCommitFiberUnmount(Nn, l);
    } catch {}
  switch (l.tag) {
    case 26:
      (mt || ge(l, e),
        Me(t, e, l),
        l.memoizedState
          ? l.memoizedState.count--
          : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
      break;
    case 27:
      mt || ge(l, e);
      var a = nt,
        n = jt;
      (hl(l.type) && ((nt = l.stateNode), (jt = !1)),
        Me(t, e, l),
        dn(l.stateNode),
        (nt = a),
        (jt = n));
      break;
    case 5:
      mt || ge(l, e);
    case 6:
      if (
        ((a = nt),
        (n = jt),
        (nt = null),
        Me(t, e, l),
        (nt = a),
        (jt = n),
        nt !== null)
      )
        if (jt)
          try {
            (nt.nodeType === 9
              ? nt.body
              : nt.nodeName === "HTML"
                ? nt.ownerDocument.body
                : nt
            ).removeChild(l.stateNode);
          } catch (u) {
            et(l, e, u);
          }
        else
          try {
            nt.removeChild(l.stateNode);
          } catch (u) {
            et(l, e, u);
          }
      break;
    case 18:
      nt !== null &&
        (jt
          ? ((t = nt),
            Xr(
              t.nodeType === 9
                ? t.body
                : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
              l.stateNode,
            ),
            _n(t))
          : Xr(nt, l.stateNode));
      break;
    case 4:
      ((a = nt),
        (n = jt),
        (nt = l.stateNode.containerInfo),
        (jt = !0),
        Me(t, e, l),
        (nt = a),
        (jt = n));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (mt || ol(2, l, e), mt || ol(4, l, e), Me(t, e, l));
      break;
    case 1:
      (mt ||
        (ge(l, e),
        (a = l.stateNode),
        typeof a.componentWillUnmount == "function" && Tm(l, e, a)),
        Me(t, e, l));
      break;
    case 21:
      Me(t, e, l);
      break;
    case 22:
      ((mt = (a = mt) || l.memoizedState !== null), Me(t, e, l), (mt = a));
      break;
    default:
      Me(t, e, l);
  }
}
function zm(t, e) {
  if (
    e.memoizedState === null &&
    ((t = e.alternate),
    t !== null &&
      ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
  )
    try {
      _n(t);
    } catch (l) {
      et(e, e.return, l);
    }
}
function Wy(t) {
  switch (t.tag) {
    case 13:
    case 19:
      var e = t.stateNode;
      return (e === null && (e = t.stateNode = new Nr()), e);
    case 22:
      return (
        (t = t.stateNode),
        (e = t._retryCache),
        e === null && (e = t._retryCache = new Nr()),
        e
      );
    default:
      throw Error(E(435, t.tag));
  }
}
function tc(t, e) {
  var l = Wy(t);
  e.forEach(function (a) {
    var n = i1.bind(null, t, a);
    l.has(a) || (l.add(a), a.then(n, n));
  });
}
function kt(t, e) {
  var l = e.deletions;
  if (l !== null)
    for (var a = 0; a < l.length; a++) {
      var n = l[a],
        u = t,
        i = e,
        c = i;
      t: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (hl(c.type)) {
              ((nt = c.stateNode), (jt = !1));
              break t;
            }
            break;
          case 5:
            ((nt = c.stateNode), (jt = !1));
            break t;
          case 3:
          case 4:
            ((nt = c.stateNode.containerInfo), (jt = !0));
            break t;
        }
        c = c.return;
      }
      if (nt === null) throw Error(E(160));
      (Cm(u, i, n),
        (nt = null),
        (jt = !1),
        (u = n.alternate),
        u !== null && (u.return = null),
        (n.return = null));
    }
  if (e.subtreeFlags & 13878)
    for (e = e.child; e !== null; ) (Um(e, t), (e = e.sibling));
}
var oe = null;
function Um(t, e) {
  var l = t.alternate,
    a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (kt(e, t),
        Zt(t),
        a & 4 && (ol(3, t, t.return), Yn(3, t), ol(5, t, t.return)));
      break;
    case 1:
      (kt(e, t),
        Zt(t),
        a & 512 && (mt || l === null || ge(l, l.return)),
        a & 64 &&
          Ne &&
          ((t = t.updateQueue),
          t !== null &&
            ((a = t.callbacks),
            a !== null &&
              ((l = t.shared.hiddenCallbacks),
              (t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
      break;
    case 26:
      var n = oe;
      if (
        (kt(e, t),
        Zt(t),
        a & 512 && (mt || l === null || ge(l, l.return)),
        a & 4)
      ) {
        var u = l !== null ? l.memoizedState : null;
        if (((a = t.memoizedState), l === null))
          if (a === null)
            if (t.stateNode === null) {
              t: {
                ((a = t.type),
                  (l = t.memoizedProps),
                  (n = n.ownerDocument || n));
                e: switch (a) {
                  case "title":
                    ((u = n.getElementsByTagName("title")[0]),
                      (!u ||
                        u[Un] ||
                        u[zt] ||
                        u.namespaceURI === "http://www.w3.org/2000/svg" ||
                        u.hasAttribute("itemprop")) &&
                        ((u = n.createElement(a)),
                        n.head.insertBefore(
                          u,
                          n.querySelector("head > title"),
                        )),
                      Nt(u, a, l),
                      (u[zt] = t),
                      Ot(u),
                      (a = u));
                    break t;
                  case "link":
                    var i = Zr("link", "href", n).get(a + (l.href || ""));
                    if (i) {
                      for (var c = 0; c < i.length; c++)
                        if (
                          ((u = i[c]),
                          u.getAttribute("href") ===
                            (l.href == null || l.href === "" ? null : l.href) &&
                            u.getAttribute("rel") ===
                              (l.rel == null ? null : l.rel) &&
                            u.getAttribute("title") ===
                              (l.title == null ? null : l.title) &&
                            u.getAttribute("crossorigin") ===
                              (l.crossOrigin == null ? null : l.crossOrigin))
                        ) {
                          i.splice(c, 1);
                          break e;
                        }
                    }
                    ((u = n.createElement(a)),
                      Nt(u, a, l),
                      n.head.appendChild(u));
                    break;
                  case "meta":
                    if (
                      (i = Zr("meta", "content", n).get(a + (l.content || "")))
                    ) {
                      for (c = 0; c < i.length; c++)
                        if (
                          ((u = i[c]),
                          u.getAttribute("content") ===
                            (l.content == null ? null : "" + l.content) &&
                            u.getAttribute("name") ===
                              (l.name == null ? null : l.name) &&
                            u.getAttribute("property") ===
                              (l.property == null ? null : l.property) &&
                            u.getAttribute("http-equiv") ===
                              (l.httpEquiv == null ? null : l.httpEquiv) &&
                            u.getAttribute("charset") ===
                              (l.charSet == null ? null : l.charSet))
                        ) {
                          i.splice(c, 1);
                          break e;
                        }
                    }
                    ((u = n.createElement(a)),
                      Nt(u, a, l),
                      n.head.appendChild(u));
                    break;
                  default:
                    throw Error(E(468, a));
                }
                ((u[zt] = t), Ot(u), (a = u));
              }
              t.stateNode = a;
            } else Kr(n, t.type, t.stateNode);
          else t.stateNode = kr(n, a, t.memoizedProps);
        else
          u !== a
            ? (u === null
                ? l.stateNode !== null &&
                  ((l = l.stateNode), l.parentNode.removeChild(l))
                : u.count--,
              a === null
                ? Kr(n, t.type, t.stateNode)
                : kr(n, a, t.memoizedProps))
            : a === null &&
              t.stateNode !== null &&
              Wi(t, t.memoizedProps, l.memoizedProps);
      }
      break;
    case 27:
      (kt(e, t),
        Zt(t),
        a & 512 && (mt || l === null || ge(l, l.return)),
        l !== null && a & 4 && Wi(t, t.memoizedProps, l.memoizedProps));
      break;
    case 5:
      if (
        (kt(e, t),
        Zt(t),
        a & 512 && (mt || l === null || ge(l, l.return)),
        t.flags & 32)
      ) {
        n = t.stateNode;
        try {
          pa(n, "");
        } catch (p) {
          et(t, t.return, p);
        }
      }
      (a & 4 &&
        t.stateNode != null &&
        ((n = t.memoizedProps), Wi(t, n, l !== null ? l.memoizedProps : n)),
        a & 1024 && (Ii = !0));
      break;
    case 6:
      if ((kt(e, t), Zt(t), a & 4)) {
        if (t.stateNode === null) throw Error(E(162));
        ((a = t.memoizedProps), (l = t.stateNode));
        try {
          l.nodeValue = a;
        } catch (p) {
          et(t, t.return, p);
        }
      }
      break;
    case 3:
      if (
        ((Au = null),
        (n = oe),
        (oe = Pu(e.containerInfo)),
        kt(e, t),
        (oe = n),
        Zt(t),
        a & 4 && l !== null && l.memoizedState.isDehydrated)
      )
        try {
          _n(e.containerInfo);
        } catch (p) {
          et(t, t.return, p);
        }
      Ii && ((Ii = !1), xm(t));
      break;
    case 4:
      ((a = oe),
        (oe = Pu(t.stateNode.containerInfo)),
        kt(e, t),
        Zt(t),
        (oe = a));
      break;
    case 12:
      (kt(e, t), Zt(t));
      break;
    case 13:
      (kt(e, t),
        Zt(t),
        t.child.flags & 8192 &&
          (t.memoizedState !== null) !=
            (l !== null && l.memoizedState !== null) &&
          (uf = be()),
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((t.updateQueue = null), tc(t, a))));
      break;
    case 22:
      n = t.memoizedState !== null;
      var s = l !== null && l.memoizedState !== null,
        f = Ne,
        d = mt;
      if (
        ((Ne = f || n),
        (mt = d || s),
        kt(e, t),
        (mt = d),
        (Ne = f),
        Zt(t),
        a & 8192)
      )
        t: for (
          e = t.stateNode,
            e._visibility = n ? e._visibility & -2 : e._visibility | 1,
            n && (l === null || s || Ne || mt || Sl(t)),
            l = null,
            e = t;
          ;
        ) {
          if (e.tag === 5 || e.tag === 26) {
            if (l === null) {
              s = l = e;
              try {
                if (((u = s.stateNode), n))
                  ((i = u.style),
                    typeof i.setProperty == "function"
                      ? i.setProperty("display", "none", "important")
                      : (i.display = "none"));
                else {
                  c = s.stateNode;
                  var y = s.memoizedProps.style,
                    m =
                      y != null && y.hasOwnProperty("display")
                        ? y.display
                        : null;
                  c.style.display =
                    m == null || typeof m == "boolean" ? "" : ("" + m).trim();
                }
              } catch (p) {
                et(s, s.return, p);
              }
            }
          } else if (e.tag === 6) {
            if (l === null) {
              s = e;
              try {
                s.stateNode.nodeValue = n ? "" : s.memoizedProps;
              } catch (p) {
                et(s, s.return, p);
              }
            }
          } else if (
            ((e.tag !== 22 && e.tag !== 23) ||
              e.memoizedState === null ||
              e === t) &&
            e.child !== null
          ) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break t;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break t;
            (l === e && (l = null), (e = e.return));
          }
          (l === e && (l = null),
            (e.sibling.return = e.return),
            (e = e.sibling));
        }
      a & 4 &&
        ((a = t.updateQueue),
        a !== null &&
          ((l = a.retryQueue),
          l !== null && ((a.retryQueue = null), tc(t, l))));
      break;
    case 19:
      (kt(e, t),
        Zt(t),
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((t.updateQueue = null), tc(t, a))));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      (kt(e, t), Zt(t));
  }
}
function Zt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      for (var l, a = t.return; a !== null; ) {
        if (_m(a)) {
          l = a;
          break;
        }
        a = a.return;
      }
      if (l == null) throw Error(E(160));
      switch (l.tag) {
        case 27:
          var n = l.stateNode,
            u = Pi(t);
          ku(t, u, n);
          break;
        case 5:
          var i = l.stateNode;
          l.flags & 32 && (pa(i, ""), (l.flags &= -33));
          var c = Pi(t);
          ku(t, c, i);
          break;
        case 3:
        case 4:
          var s = l.stateNode.containerInfo,
            f = Pi(t);
          Zc(t, f, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (d) {
      et(t, t.return, d);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function xm(t) {
  if (t.subtreeFlags & 1024)
    for (t = t.child; t !== null; ) {
      var e = t;
      (xm(e),
        e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
        (t = t.sibling));
    }
}
function Ve(t, e) {
  if (e.subtreeFlags & 8772)
    for (e = e.child; e !== null; ) (Mm(t, e.alternate, e), (e = e.sibling));
}
function Sl(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ol(4, e, e.return), Sl(e));
        break;
      case 1:
        ge(e, e.return);
        var l = e.stateNode;
        (typeof l.componentWillUnmount == "function" && Tm(e, e.return, l),
          Sl(e));
        break;
      case 27:
        dn(e.stateNode);
      case 26:
      case 5:
        (ge(e, e.return), Sl(e));
        break;
      case 22:
        e.memoizedState === null && Sl(e);
        break;
      case 30:
        Sl(e);
        break;
      default:
        Sl(e);
    }
    t = t.sibling;
  }
}
function ke(t, e, l) {
  for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
    var a = e.alternate,
      n = t,
      u = e,
      i = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        (ke(n, u, l), Yn(4, u));
        break;
      case 1:
        if (
          (ke(n, u, l),
          (a = u),
          (n = a.stateNode),
          typeof n.componentDidMount == "function")
        )
          try {
            n.componentDidMount();
          } catch (f) {
            et(a, a.return, f);
          }
        if (((a = u), (n = a.updateQueue), n !== null)) {
          var c = a.stateNode;
          try {
            var s = n.shared.hiddenCallbacks;
            if (s !== null)
              for (n.shared.hiddenCallbacks = null, n = 0; n < s.length; n++)
                Md(s[n], c);
          } catch (f) {
            et(a, a.return, f);
          }
        }
        (l && i & 64 && Om(u), sn(u, u.return));
        break;
      case 27:
        Dm(u);
      case 26:
      case 5:
        (ke(n, u, l), l && a === null && i & 4 && Rm(u), sn(u, u.return));
        break;
      case 12:
        ke(n, u, l);
        break;
      case 13:
        (ke(n, u, l), l && i & 4 && zm(n, u));
        break;
      case 22:
        (u.memoizedState === null && ke(n, u, l), sn(u, u.return));
        break;
      case 30:
        break;
      default:
        ke(n, u, l);
    }
    e = e.sibling;
  }
}
function ef(t, e) {
  var l = null;
  (t !== null &&
    t.memoizedState !== null &&
    t.memoizedState.cachePool !== null &&
    (l = t.memoizedState.cachePool.pool),
    (t = null),
    e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (t = e.memoizedState.cachePool.pool),
    t !== l && (t != null && t.refCount++, l != null && Hn(l)));
}
function lf(t, e) {
  ((t = null),
    e.alternate !== null && (t = e.alternate.memoizedState.cache),
    (e = e.memoizedState.cache),
    e !== t && (e.refCount++, t != null && Hn(t)));
}
function ye(t, e, l, a) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (wm(t, e, l, a), (e = e.sibling));
}
function wm(t, e, l, a) {
  var n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (ye(t, e, l, a), n & 2048 && Yn(9, e));
      break;
    case 1:
      ye(t, e, l, a);
      break;
    case 3:
      (ye(t, e, l, a),
        n & 2048 &&
          ((t = null),
          e.alternate !== null && (t = e.alternate.memoizedState.cache),
          (e = e.memoizedState.cache),
          e !== t && (e.refCount++, t != null && Hn(t))));
      break;
    case 12:
      if (n & 2048) {
        (ye(t, e, l, a), (t = e.stateNode));
        try {
          var u = e.memoizedProps,
            i = u.id,
            c = u.onPostCommit;
          typeof c == "function" &&
            c(
              i,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0,
            );
        } catch (s) {
          et(e, e.return, s);
        }
      } else ye(t, e, l, a);
      break;
    case 13:
      ye(t, e, l, a);
      break;
    case 23:
      break;
    case 22:
      ((u = e.stateNode),
        (i = e.alternate),
        e.memoizedState !== null
          ? u._visibility & 2
            ? ye(t, e, l, a)
            : fn(t, e)
          : u._visibility & 2
            ? ye(t, e, l, a)
            : ((u._visibility |= 2),
              Zl(t, e, l, a, (e.subtreeFlags & 10256) !== 0)),
        n & 2048 && ef(i, e));
      break;
    case 24:
      (ye(t, e, l, a), n & 2048 && lf(e.alternate, e));
      break;
    default:
      ye(t, e, l, a);
  }
}
function Zl(t, e, l, a, n) {
  for (n = n && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
    var u = t,
      i = e,
      c = l,
      s = a,
      f = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Zl(u, i, c, s, n), Yn(8, i));
        break;
      case 23:
        break;
      case 22:
        var d = i.stateNode;
        (i.memoizedState !== null
          ? d._visibility & 2
            ? Zl(u, i, c, s, n)
            : fn(u, i)
          : ((d._visibility |= 2), Zl(u, i, c, s, n)),
          n && f & 2048 && ef(i.alternate, i));
        break;
      case 24:
        (Zl(u, i, c, s, n), n && f & 2048 && lf(i.alternate, i));
        break;
      default:
        Zl(u, i, c, s, n);
    }
    e = e.sibling;
  }
}
function fn(t, e) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) {
      var l = t,
        a = e,
        n = a.flags;
      switch (a.tag) {
        case 22:
          (fn(l, a), n & 2048 && ef(a.alternate, a));
          break;
        case 24:
          (fn(l, a), n & 2048 && lf(a.alternate, a));
          break;
        default:
          fn(l, a);
      }
      e = e.sibling;
    }
}
var Fa = 8192;
function Xl(t) {
  if (t.subtreeFlags & Fa)
    for (t = t.child; t !== null; ) (Bm(t), (t = t.sibling));
}
function Bm(t) {
  switch (t.tag) {
    case 26:
      (Xl(t),
        t.flags & Fa &&
          t.memoizedState !== null &&
          H1(oe, t.memoizedState, t.memoizedProps));
      break;
    case 5:
      Xl(t);
      break;
    case 3:
    case 4:
      var e = oe;
      ((oe = Pu(t.stateNode.containerInfo)), Xl(t), (oe = e));
      break;
    case 22:
      t.memoizedState === null &&
        ((e = t.alternate),
        e !== null && e.memoizedState !== null
          ? ((e = Fa), (Fa = 16777216), Xl(t), (Fa = e))
          : Xl(t));
      break;
    default:
      Xl(t);
  }
}
function Hm(t) {
  var e = t.alternate;
  if (e !== null && ((t = e.child), t !== null)) {
    e.child = null;
    do ((e = t.sibling), (t.sibling = null), (t = e));
    while (t !== null);
  }
}
function Qa(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var a = e[l];
        ((At = a), Lm(a, t));
      }
    Hm(t);
  }
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (qm(t), (t = t.sibling));
}
function qm(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (Qa(t), t.flags & 2048 && ol(9, t, t.return));
      break;
    case 3:
      Qa(t);
      break;
    case 12:
      Qa(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null &&
      e._visibility & 2 &&
      (t.return === null || t.return.tag !== 13)
        ? ((e._visibility &= -3), Su(t))
        : Qa(t);
      break;
    default:
      Qa(t);
  }
}
function Su(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var a = e[l];
        ((At = a), Lm(a, t));
      }
    Hm(t);
  }
  for (t = t.child; t !== null; ) {
    switch (((e = t), e.tag)) {
      case 0:
      case 11:
      case 15:
        (ol(8, e, e.return), Su(e));
        break;
      case 22:
        ((l = e.stateNode),
          l._visibility & 2 && ((l._visibility &= -3), Su(e)));
        break;
      default:
        Su(e);
    }
    t = t.sibling;
  }
}
function Lm(t, e) {
  for (; At !== null; ) {
    var l = At;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ol(8, l, e);
        break;
      case 23:
      case 22:
        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          var a = l.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        Hn(l.memoizedState.cache);
    }
    if (((a = l.child), a !== null)) ((a.return = l), (At = a));
    else
      t: for (l = t; At !== null; ) {
        a = At;
        var n = a.sibling,
          u = a.return;
        if ((Nm(a), a === l)) {
          At = null;
          break t;
        }
        if (n !== null) {
          ((n.return = u), (At = n));
          break t;
        }
        At = u;
      }
  }
}
var Py = {
    getCacheForType: function (t) {
      var e = Ut(gt),
        l = e.data.get(t);
      return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
    },
  },
  Iy = typeof WeakMap == "function" ? WeakMap : Map,
  F = 0,
  lt = null,
  Q = null,
  V = 0,
  $ = 0,
  Jt = null,
  tl = !1,
  za = !1,
  af = !1,
  Ye = 0,
  rt = 0,
  dl = 0,
  Ml = 0,
  nf = 0,
  se = 0,
  Ea = 0,
  rn = null,
  Yt = null,
  Kc = !1,
  uf = 0,
  Zu = 1 / 0,
  Ku = null,
  ul = null,
  Dt = 0,
  il = null,
  Aa = null,
  ma = 0,
  Jc = 0,
  $c = null,
  jm = null,
  on = 0,
  Fc = null;
function Pt() {
  if (F & 2 && V !== 0) return V & -V;
  if (B.T !== null) {
    var t = ga;
    return t !== 0 ? t : sf();
  }
  return Fo();
}
function Ym() {
  se === 0 && (se = !(V & 536870912) || K ? Zo() : 536870912);
  var t = fe.current;
  return (t !== null && (t.flags |= 32), se);
}
function It(t, e, l) {
  (((t === lt && ($ === 2 || $ === 9)) || t.cancelPendingCommit !== null) &&
    (Oa(t, 0), el(t, V, se, !1)),
    zn(t, l),
    (!(F & 2) || t !== lt) &&
      (t === lt && (!(F & 2) && (Ml |= l), rt === 4 && el(t, V, se, !1)),
      Ae(t)));
}
function Xm(t, e, l) {
  if (F & 6) throw Error(E(327));
  var a = (!l && (e & 124) === 0 && (e & t.expiredLanes) === 0) || Cn(t, e),
    n = a ? l1(t, e) : ec(t, e, !0),
    u = a;
  do {
    if (n === 0) {
      za && !a && el(t, e, 0, !1);
      break;
    } else {
      if (((l = t.current.alternate), u && !t1(l))) {
        ((n = ec(t, e, !1)), (u = !1));
        continue;
      }
      if (n === 2) {
        if (((u = e), t.errorRecoveryDisabledLanes & u)) var i = 0;
        else
          ((i = t.pendingLanes & -536870913),
            (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
        if (i !== 0) {
          e = i;
          t: {
            var c = t;
            n = rn;
            var s = c.current.memoizedState.isDehydrated;
            if ((s && (Oa(c, i).flags |= 256), (i = ec(c, i, !1)), i !== 2)) {
              if (af && !s) {
                ((c.errorRecoveryDisabledLanes |= u), (Ml |= u), (n = 4));
                break t;
              }
              ((u = Yt),
                (Yt = n),
                u !== null && (Yt === null ? (Yt = u) : Yt.push.apply(Yt, u)));
            }
            n = i;
          }
          if (((u = !1), n !== 2)) continue;
        }
      }
      if (n === 1) {
        (Oa(t, 0), el(t, e, 0, !0));
        break;
      }
      t: {
        switch (((a = t), (u = n), u)) {
          case 0:
          case 1:
            throw Error(E(345));
          case 4:
            if ((e & 4194048) !== e) break;
          case 6:
            el(a, e, se, !tl);
            break t;
          case 2:
            Yt = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(E(329));
        }
        if ((e & 62914560) === e && ((n = uf + 300 - be()), 10 < n)) {
          if ((el(a, e, se, !tl), fi(a, 0, !0) !== 0)) break t;
          a.timeoutHandle = ih(
            Cr.bind(null, a, l, Yt, Ku, Kc, e, se, Ml, Ea, tl, u, 2, -0, 0),
            n,
          );
          break t;
        }
        Cr(a, l, Yt, Ku, Kc, e, se, Ml, Ea, tl, u, 0, -0, 0);
      }
    }
    break;
  } while (!0);
  Ae(t);
}
function Cr(t, e, l, a, n, u, i, c, s, f, d, y, m, p) {
  if (
    ((t.timeoutHandle = -1),
    (y = e.subtreeFlags),
    (y & 8192 || (y & 16785408) === 16785408) &&
      ((An = { stylesheets: null, count: 0, unsuspend: B1 }),
      Bm(e),
      (y = q1()),
      y !== null))
  ) {
    ((t.cancelPendingCommit = y(
      Ur.bind(null, t, e, u, l, a, n, i, c, s, d, 1, m, p),
    )),
      el(t, u, i, !f));
    return;
  }
  Ur(t, e, u, l, a, n, i, c, s);
}
function t1(t) {
  for (var e = t; ; ) {
    var l = e.tag;
    if (
      (l === 0 || l === 11 || l === 15) &&
      e.flags & 16384 &&
      ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
    )
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = n.getSnapshot;
        n = n.value;
        try {
          if (!te(u(), n)) return !1;
        } catch {
          return !1;
        }
      }
    if (((l = e.child), e.subtreeFlags & 16384 && l !== null))
      ((l.return = e), (e = l));
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  }
  return !0;
}
function el(t, e, l, a) {
  ((e &= ~nf),
    (e &= ~Ml),
    (t.suspendedLanes |= e),
    (t.pingedLanes &= ~e),
    a && (t.warmLanes |= e),
    (a = t.expirationTimes));
  for (var n = e; 0 < n; ) {
    var u = 31 - Wt(n),
      i = 1 << u;
    ((a[u] = -1), (n &= ~i));
  }
  l !== 0 && Jo(t, l, e);
}
function bi() {
  return F & 6 ? !0 : (Xn(0), !1);
}
function cf() {
  if (Q !== null) {
    if ($ === 0) var t = Q.return;
    else ((t = Q), (xe = Yl = null), Zs(t), (da = null), (bn = 0), (t = Q));
    for (; t !== null; ) (Am(t.alternate, t), (t = t.return));
    Q = null;
  }
}
function Oa(t, e) {
  var l = t.timeoutHandle;
  (l !== -1 && ((t.timeoutHandle = -1), v1(l)),
    (l = t.cancelPendingCommit),
    l !== null && ((t.cancelPendingCommit = null), l()),
    cf(),
    (lt = t),
    (Q = l = Be(t.current, null)),
    (V = e),
    ($ = 0),
    (Jt = null),
    (tl = !1),
    (za = Cn(t, e)),
    (af = !1),
    (Ea = se = nf = Ml = dl = rt = 0),
    (Yt = rn = null),
    (Kc = !1),
    e & 8 && (e |= e & 32));
  var a = t.entangledLanes;
  if (a !== 0)
    for (t = t.entanglements, a &= e; 0 < a; ) {
      var n = 31 - Wt(a),
        u = 1 << n;
      ((e |= t[n]), (a &= ~u));
    }
  return ((Ye = e), mi(), l);
}
function Gm(t, e) {
  ((Y = null),
    (B.H = Yu),
    e === qn || e === yi
      ? ((e = sr()), ($ = 3))
      : e === _d
        ? ((e = sr()), ($ = 4))
        : ($ =
            e === pm
              ? 8
              : e !== null &&
                  typeof e == "object" &&
                  typeof e.then == "function"
                ? 6
                : 1),
    (Jt = e),
    Q === null && ((rt = 1), Qu(t, ce(e, t.current))));
}
function Qm() {
  var t = B.H;
  return ((B.H = Yu), t === null ? Yu : t);
}
function Vm() {
  var t = B.A;
  return ((B.A = Py), t);
}
function Wc() {
  ((rt = 4),
    tl || ((V & 4194048) !== V && fe.current !== null) || (za = !0),
    (!(dl & 134217727) && !(Ml & 134217727)) ||
      lt === null ||
      el(lt, V, se, !1));
}
function ec(t, e, l) {
  var a = F;
  F |= 2;
  var n = Qm(),
    u = Vm();
  ((lt !== t || V !== e) && ((Ku = null), Oa(t, e)), (e = !1));
  var i = rt;
  t: do
    try {
      if ($ !== 0 && Q !== null) {
        var c = Q,
          s = Jt;
        switch ($) {
          case 8:
            (cf(), (i = 6));
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            fe.current === null && (e = !0);
            var f = $;
            if ((($ = 0), (Jt = null), ua(t, c, s, f), l && za)) {
              i = 0;
              break t;
            }
            break;
          default:
            ((f = $), ($ = 0), (Jt = null), ua(t, c, s, f));
        }
      }
      (e1(), (i = rt));
      break;
    } catch (d) {
      Gm(t, d);
    }
  while (!0);
  return (
    e && t.shellSuspendCounter++,
    (xe = Yl = null),
    (F = a),
    (B.H = n),
    (B.A = u),
    Q === null && ((lt = null), (V = 0), mi()),
    i
  );
}
function e1() {
  for (; Q !== null; ) km(Q);
}
function l1(t, e) {
  var l = F;
  F |= 2;
  var a = Qm(),
    n = Vm();
  lt !== t || V !== e
    ? ((Ku = null), (Zu = be() + 500), Oa(t, e))
    : (za = Cn(t, e));
  t: do
    try {
      if ($ !== 0 && Q !== null) {
        e = Q;
        var u = Jt;
        e: switch ($) {
          case 1:
            (($ = 0), (Jt = null), ua(t, e, u, 1));
            break;
          case 2:
          case 9:
            if (cr(u)) {
              (($ = 0), (Jt = null), zr(e));
              break;
            }
            ((e = function () {
              (($ !== 2 && $ !== 9) || lt !== t || ($ = 7), Ae(t));
            }),
              u.then(e, e));
            break t;
          case 3:
            $ = 7;
            break t;
          case 4:
            $ = 5;
            break t;
          case 7:
            cr(u)
              ? (($ = 0), (Jt = null), zr(e))
              : (($ = 0), (Jt = null), ua(t, e, u, 7));
            break;
          case 5:
            var i = null;
            switch (Q.tag) {
              case 26:
                i = Q.memoizedState;
              case 5:
              case 27:
                var c = Q;
                if (!i || rh(i)) {
                  (($ = 0), (Jt = null));
                  var s = c.sibling;
                  if (s !== null) Q = s;
                  else {
                    var f = c.return;
                    f !== null ? ((Q = f), Si(f)) : (Q = null);
                  }
                  break e;
                }
            }
            (($ = 0), (Jt = null), ua(t, e, u, 5));
            break;
          case 6:
            (($ = 0), (Jt = null), ua(t, e, u, 6));
            break;
          case 8:
            (cf(), (rt = 6));
            break t;
          default:
            throw Error(E(462));
        }
      }
      a1();
      break;
    } catch (d) {
      Gm(t, d);
    }
  while (!0);
  return (
    (xe = Yl = null),
    (B.H = a),
    (B.A = n),
    (F = l),
    Q !== null ? 0 : ((lt = null), (V = 0), mi(), rt)
  );
}
function a1() {
  for (; Q !== null && !R0(); ) km(Q);
}
function km(t) {
  var e = Em(t.alternate, t, Ye);
  ((t.memoizedProps = t.pendingProps), e === null ? Si(t) : (Q = e));
}
function zr(t) {
  var e = t,
    l = e.alternate;
  switch (e.tag) {
    case 15:
    case 0:
      e = Tr(l, e, e.pendingProps, e.type, void 0, V);
      break;
    case 11:
      e = Tr(l, e, e.pendingProps, e.type.render, e.ref, V);
      break;
    case 5:
      Zs(e);
    default:
      (Am(l, e), (e = Q = Ad(e, Ye)), (e = Em(l, e, Ye)));
  }
  ((t.memoizedProps = t.pendingProps), e === null ? Si(t) : (Q = e));
}
function ua(t, e, l, a) {
  ((xe = Yl = null), Zs(e), (da = null), (bn = 0));
  var n = e.return;
  try {
    if (Zy(t, n, e, l, V)) {
      ((rt = 1), Qu(t, ce(l, t.current)), (Q = null));
      return;
    }
  } catch (u) {
    if (n !== null) throw ((Q = n), u);
    ((rt = 1), Qu(t, ce(l, t.current)), (Q = null));
    return;
  }
  e.flags & 32768
    ? (K || a === 1
        ? (t = !0)
        : za || V & 536870912
          ? (t = !1)
          : ((tl = t = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = fe.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
      Zm(e, t))
    : Si(e);
}
function Si(t) {
  var e = t;
  do {
    if (e.flags & 32768) {
      Zm(e, tl);
      return;
    }
    t = e.return;
    var l = Jy(e.alternate, e, Ye);
    if (l !== null) {
      Q = l;
      return;
    }
    if (((e = e.sibling), e !== null)) {
      Q = e;
      return;
    }
    Q = e = t;
  } while (e !== null);
  rt === 0 && (rt = 5);
}
function Zm(t, e) {
  do {
    var l = $y(t.alternate, t);
    if (l !== null) {
      ((l.flags &= 32767), (Q = l));
      return;
    }
    if (
      ((l = t.return),
      l !== null &&
        ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
      !e && ((t = t.sibling), t !== null))
    ) {
      Q = t;
      return;
    }
    Q = t = l;
  } while (t !== null);
  ((rt = 6), (Q = null));
}
function Ur(t, e, l, a, n, u, i, c, s) {
  t.cancelPendingCommit = null;
  do Ei();
  while (Dt !== 0);
  if (F & 6) throw Error(E(327));
  if (e !== null) {
    if (e === t.current) throw Error(E(177));
    if (
      ((u = e.lanes | e.childLanes),
      (u |= xs),
      B0(t, l, u, i, c, s),
      t === lt && ((Q = lt = null), (V = 0)),
      (Aa = e),
      (il = t),
      (ma = l),
      (Jc = u),
      ($c = n),
      (jm = a),
      e.subtreeFlags & 10256 || e.flags & 10256
        ? ((t.callbackNode = null),
          (t.callbackPriority = 0),
          c1(Cu, function () {
            return (Wm(), null);
          }))
        : ((t.callbackNode = null), (t.callbackPriority = 0)),
      (a = (e.flags & 13878) !== 0),
      e.subtreeFlags & 13878 || a)
    ) {
      ((a = B.T), (B.T = null), (n = J.p), (J.p = 2), (i = F), (F |= 4));
      try {
        Fy(t, e, l);
      } finally {
        ((F = i), (J.p = n), (B.T = a));
      }
    }
    ((Dt = 1), Km(), Jm(), $m());
  }
}
function Km() {
  if (Dt === 1) {
    Dt = 0;
    var t = il,
      e = Aa,
      l = (e.flags & 13878) !== 0;
    if (e.subtreeFlags & 13878 || l) {
      ((l = B.T), (B.T = null));
      var a = J.p;
      J.p = 2;
      var n = F;
      F |= 4;
      try {
        Um(e, t);
        var u = es,
          i = hd(t.containerInfo),
          c = u.focusedElem,
          s = u.selectionRange;
        if (
          i !== c &&
          c &&
          c.ownerDocument &&
          md(c.ownerDocument.documentElement, c)
        ) {
          if (s !== null && Us(c)) {
            var f = s.start,
              d = s.end;
            if ((d === void 0 && (d = f), "selectionStart" in c))
              ((c.selectionStart = f),
                (c.selectionEnd = Math.min(d, c.value.length)));
            else {
              var y = c.ownerDocument || document,
                m = (y && y.defaultView) || window;
              if (m.getSelection) {
                var p = m.getSelection(),
                  T = c.textContent.length,
                  A = Math.min(s.start, T),
                  R = s.end === void 0 ? A : Math.min(s.end, T);
                !p.extend && A > R && ((i = R), (R = A), (A = i));
                var o = If(c, A),
                  r = If(c, R);
                if (
                  o &&
                  r &&
                  (p.rangeCount !== 1 ||
                    p.anchorNode !== o.node ||
                    p.anchorOffset !== o.offset ||
                    p.focusNode !== r.node ||
                    p.focusOffset !== r.offset)
                ) {
                  var h = y.createRange();
                  (h.setStart(o.node, o.offset),
                    p.removeAllRanges(),
                    A > R
                      ? (p.addRange(h), p.extend(r.node, r.offset))
                      : (h.setEnd(r.node, r.offset), p.addRange(h)));
                }
              }
            }
          }
          for (y = [], p = c; (p = p.parentNode); )
            p.nodeType === 1 &&
              y.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
          for (
            typeof c.focus == "function" && c.focus(), c = 0;
            c < y.length;
            c++
          ) {
            var b = y[c];
            ((b.element.scrollLeft = b.left), (b.element.scrollTop = b.top));
          }
        }
        ((ei = !!ts), (es = ts = null));
      } finally {
        ((F = n), (J.p = a), (B.T = l));
      }
    }
    ((t.current = e), (Dt = 2));
  }
}
function Jm() {
  if (Dt === 2) {
    Dt = 0;
    var t = il,
      e = Aa,
      l = (e.flags & 8772) !== 0;
    if (e.subtreeFlags & 8772 || l) {
      ((l = B.T), (B.T = null));
      var a = J.p;
      J.p = 2;
      var n = F;
      F |= 4;
      try {
        Mm(t, e.alternate, e);
      } finally {
        ((F = n), (J.p = a), (B.T = l));
      }
    }
    Dt = 3;
  }
}
function $m() {
  if (Dt === 4 || Dt === 3) {
    ((Dt = 0), _0());
    var t = il,
      e = Aa,
      l = ma,
      a = jm;
    e.subtreeFlags & 10256 || e.flags & 10256
      ? (Dt = 5)
      : ((Dt = 0), (Aa = il = null), Fm(t, t.pendingLanes));
    var n = t.pendingLanes;
    if (
      (n === 0 && (ul = null),
      Rs(l),
      (e = e.stateNode),
      Ft && typeof Ft.onCommitFiberRoot == "function")
    )
      try {
        Ft.onCommitFiberRoot(Nn, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
    if (a !== null) {
      ((e = B.T), (n = J.p), (J.p = 2), (B.T = null));
      try {
        for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
          var c = a[i];
          u(c.value, { componentStack: c.stack });
        }
      } finally {
        ((B.T = e), (J.p = n));
      }
    }
    (ma & 3 && Ei(),
      Ae(t),
      (n = t.pendingLanes),
      l & 4194090 && n & 42
        ? t === Fc
          ? on++
          : ((on = 0), (Fc = t))
        : (on = 0),
      Xn(0));
  }
}
function Fm(t, e) {
  (t.pooledCacheLanes &= e) === 0 &&
    ((e = t.pooledCache), e != null && ((t.pooledCache = null), Hn(e)));
}
function Ei(t) {
  return (Km(), Jm(), $m(), Wm());
}
function Wm() {
  if (Dt !== 5) return !1;
  var t = il,
    e = Jc;
  Jc = 0;
  var l = Rs(ma),
    a = B.T,
    n = J.p;
  try {
    ((J.p = 32 > l ? 32 : l), (B.T = null), (l = $c), ($c = null));
    var u = il,
      i = ma;
    if (((Dt = 0), (Aa = il = null), (ma = 0), F & 6)) throw Error(E(331));
    var c = F;
    if (
      ((F |= 4),
      qm(u.current),
      wm(u, u.current, i, l),
      (F = c),
      Xn(0, !1),
      Ft && typeof Ft.onPostCommitFiberRoot == "function")
    )
      try {
        Ft.onPostCommitFiberRoot(Nn, u);
      } catch {}
    return !0;
  } finally {
    ((J.p = n), (B.T = a), Fm(t, e));
  }
}
function xr(t, e, l) {
  ((e = ce(l, e)),
    (e = Qc(t.stateNode, e, 2)),
    (t = nl(t, e, 2)),
    t !== null && (zn(t, 2), Ae(t)));
}
function et(t, e, l) {
  if (t.tag === 3) xr(t, t, l);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        xr(e, t, l);
        break;
      } else if (e.tag === 1) {
        var a = e.stateNode;
        if (
          typeof e.type.getDerivedStateFromError == "function" ||
          (typeof a.componentDidCatch == "function" &&
            (ul === null || !ul.has(a)))
        ) {
          ((t = ce(l, t)),
            (l = hm(2)),
            (a = nl(e, l, 2)),
            a !== null && (ym(l, a, e, t), zn(a, 2), Ae(a)));
          break;
        }
      }
      e = e.return;
    }
}
function lc(t, e, l) {
  var a = t.pingCache;
  if (a === null) {
    a = t.pingCache = new Iy();
    var n = new Set();
    a.set(e, n);
  } else ((n = a.get(e)), n === void 0 && ((n = new Set()), a.set(e, n)));
  n.has(l) || ((af = !0), n.add(l), (t = n1.bind(null, t, e, l)), e.then(t, t));
}
function n1(t, e, l) {
  var a = t.pingCache;
  (a !== null && a.delete(e),
    (t.pingedLanes |= t.suspendedLanes & l),
    (t.warmLanes &= ~l),
    lt === t &&
      (V & l) === l &&
      (rt === 4 || (rt === 3 && (V & 62914560) === V && 300 > be() - uf)
        ? !(F & 2) && Oa(t, 0)
        : (nf |= l),
      Ea === V && (Ea = 0)),
    Ae(t));
}
function Pm(t, e) {
  (e === 0 && (e = Ko()), (t = Ca(t, e)), t !== null && (zn(t, e), Ae(t)));
}
function u1(t) {
  var e = t.memoizedState,
    l = 0;
  (e !== null && (l = e.retryLane), Pm(t, l));
}
function i1(t, e) {
  var l = 0;
  switch (t.tag) {
    case 13:
      var a = t.stateNode,
        n = t.memoizedState;
      n !== null && (l = n.retryLane);
      break;
    case 19:
      a = t.stateNode;
      break;
    case 22:
      a = t.stateNode._retryCache;
      break;
    default:
      throw Error(E(314));
  }
  (a !== null && a.delete(e), Pm(t, l));
}
function c1(t, e) {
  return Os(t, e);
}
var Ju = null,
  Kl = null,
  Pc = !1,
  $u = !1,
  ac = !1,
  Nl = 0;
function Ae(t) {
  (t !== Kl &&
    t.next === null &&
    (Kl === null ? (Ju = Kl = t) : (Kl = Kl.next = t)),
    ($u = !0),
    Pc || ((Pc = !0), f1()));
}
function Xn(t, e) {
  if (!ac && $u) {
    ac = !0;
    do
      for (var l = !1, a = Ju; a !== null; ) {
        if (t !== 0) {
          var n = a.pendingLanes;
          if (n === 0) var u = 0;
          else {
            var i = a.suspendedLanes,
              c = a.pingedLanes;
            ((u = (1 << (31 - Wt(42 | t) + 1)) - 1),
              (u &= n & ~(i & ~c)),
              (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
          }
          u !== 0 && ((l = !0), wr(a, u));
        } else
          ((u = V),
            (u = fi(
              a,
              a === lt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
            )),
            !(u & 3) || Cn(a, u) || ((l = !0), wr(a, u)));
        a = a.next;
      }
    while (l);
    ac = !1;
  }
}
function s1() {
  Im();
}
function Im() {
  $u = Pc = !1;
  var t = 0;
  Nl !== 0 && (g1() && (t = Nl), (Nl = 0));
  for (var e = be(), l = null, a = Ju; a !== null; ) {
    var n = a.next,
      u = th(a, e);
    (u === 0
      ? ((a.next = null),
        l === null ? (Ju = n) : (l.next = n),
        n === null && (Kl = l))
      : ((l = a), (t !== 0 || u & 3) && ($u = !0)),
      (a = n));
  }
  Xn(t);
}
function th(t, e) {
  for (
    var l = t.suspendedLanes,
      a = t.pingedLanes,
      n = t.expirationTimes,
      u = t.pendingLanes & -62914561;
    0 < u;
  ) {
    var i = 31 - Wt(u),
      c = 1 << i,
      s = n[i];
    (s === -1
      ? (!(c & l) || c & a) && (n[i] = w0(c, e))
      : s <= e && (t.expiredLanes |= c),
      (u &= ~c));
  }
  if (
    ((e = lt),
    (l = V),
    (l = fi(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
    )),
    (a = t.callbackNode),
    l === 0 ||
      (t === e && ($ === 2 || $ === 9)) ||
      t.cancelPendingCommit !== null)
  )
    return (
      a !== null && a !== null && Ni(a),
      (t.callbackNode = null),
      (t.callbackPriority = 0)
    );
  if (!(l & 3) || Cn(t, l)) {
    if (((e = l & -l), e === t.callbackPriority)) return e;
    switch ((a !== null && Ni(a), Rs(l))) {
      case 2:
      case 8:
        l = Vo;
        break;
      case 32:
        l = Cu;
        break;
      case 268435456:
        l = ko;
        break;
      default:
        l = Cu;
    }
    return (
      (a = eh.bind(null, t)),
      (l = Os(l, a)),
      (t.callbackPriority = e),
      (t.callbackNode = l),
      e
    );
  }
  return (
    a !== null && a !== null && Ni(a),
    (t.callbackPriority = 2),
    (t.callbackNode = null),
    2
  );
}
function eh(t, e) {
  if (Dt !== 0 && Dt !== 5)
    return ((t.callbackNode = null), (t.callbackPriority = 0), null);
  var l = t.callbackNode;
  if (Ei() && t.callbackNode !== l) return null;
  var a = V;
  return (
    (a = fi(
      t,
      t === lt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
    )),
    a === 0
      ? null
      : (Xm(t, a, e),
        th(t, be()),
        t.callbackNode != null && t.callbackNode === l
          ? eh.bind(null, t)
          : null)
  );
}
function wr(t, e) {
  if (Ei()) return null;
  Xm(t, e, !0);
}
function f1() {
  b1(function () {
    F & 6 ? Os(Qo, s1) : Im();
  });
}
function sf() {
  return (Nl === 0 && (Nl = Zo()), Nl);
}
function Br(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean"
    ? null
    : typeof t == "function"
      ? t
      : du("" + t);
}
function Hr(t, e) {
  var l = e.ownerDocument.createElement("input");
  return (
    (l.name = e.name),
    (l.value = e.value),
    t.id && l.setAttribute("form", t.id),
    e.parentNode.insertBefore(l, e),
    (t = new FormData(t)),
    l.parentNode.removeChild(l),
    t
  );
}
function r1(t, e, l, a, n) {
  if (e === "submit" && l && l.stateNode === n) {
    var u = Br((n[Gt] || null).action),
      i = a.submitter;
    i &&
      ((e = (e = i[Gt] || null)
        ? Br(e.formAction)
        : i.getAttribute("formAction")),
      e !== null && ((u = e), (i = null)));
    var c = new ri("action", "action", null, a, n);
    t.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (a.defaultPrevented) {
              if (Nl !== 0) {
                var s = i ? Hr(n, i) : new FormData(n);
                Xc(
                  l,
                  { pending: !0, data: s, method: n.method, action: u },
                  null,
                  s,
                );
              }
            } else
              typeof u == "function" &&
                (c.preventDefault(),
                (s = i ? Hr(n, i) : new FormData(n)),
                Xc(
                  l,
                  { pending: !0, data: s, method: n.method, action: u },
                  u,
                  s,
                ));
          },
          currentTarget: n,
        },
      ],
    });
  }
}
for (var nc = 0; nc < Nc.length; nc++) {
  var uc = Nc[nc],
    o1 = uc.toLowerCase(),
    d1 = uc[0].toUpperCase() + uc.slice(1);
  me(o1, "on" + d1);
}
me(pd, "onAnimationEnd");
me(gd, "onAnimationIteration");
me(vd, "onAnimationStart");
me("dblclick", "onDoubleClick");
me("focusin", "onFocus");
me("focusout", "onBlur");
me(Ny, "onTransitionRun");
me(Cy, "onTransitionStart");
me(zy, "onTransitionCancel");
me(bd, "onTransitionEnd");
ya("onMouseEnter", ["mouseout", "mouseover"]);
ya("onMouseLeave", ["mouseout", "mouseover"]);
ya("onPointerEnter", ["pointerout", "pointerover"]);
ya("onPointerLeave", ["pointerout", "pointerover"]);
ql(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
ql(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
ql("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ql(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
ql(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
ql(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Sn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  m1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(Sn),
  );
function lh(t, e) {
  e = (e & 4) !== 0;
  for (var l = 0; l < t.length; l++) {
    var a = t[l],
      n = a.event;
    a = a.listeners;
    t: {
      var u = void 0;
      if (e)
        for (var i = a.length - 1; 0 <= i; i--) {
          var c = a[i],
            s = c.instance,
            f = c.currentTarget;
          if (((c = c.listener), s !== u && n.isPropagationStopped())) break t;
          ((u = c), (n.currentTarget = f));
          try {
            u(n);
          } catch (d) {
            Gu(d);
          }
          ((n.currentTarget = null), (u = s));
        }
      else
        for (i = 0; i < a.length; i++) {
          if (
            ((c = a[i]),
            (s = c.instance),
            (f = c.currentTarget),
            (c = c.listener),
            s !== u && n.isPropagationStopped())
          )
            break t;
          ((u = c), (n.currentTarget = f));
          try {
            u(n);
          } catch (d) {
            Gu(d);
          }
          ((n.currentTarget = null), (u = s));
        }
    }
  }
}
function G(t, e) {
  var l = e[Ac];
  l === void 0 && (l = e[Ac] = new Set());
  var a = t + "__bubble";
  l.has(a) || (ah(e, t, 2, !1), l.add(a));
}
function ic(t, e, l) {
  var a = 0;
  (e && (a |= 4), ah(l, t, a, e));
}
var iu = "_reactListening" + Math.random().toString(36).slice(2);
function ff(t) {
  if (!t[iu]) {
    ((t[iu] = !0),
      Wo.forEach(function (l) {
        l !== "selectionchange" && (m1.has(l) || ic(l, !1, t), ic(l, !0, t));
      }));
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[iu] || ((e[iu] = !0), ic("selectionchange", !1, e));
  }
}
function ah(t, e, l, a) {
  switch (yh(e)) {
    case 2:
      var n = Y1;
      break;
    case 8:
      n = X1;
      break;
    default:
      n = mf;
  }
  ((l = n.bind(null, e, l, t)),
    (n = void 0),
    !_c ||
      (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
      (n = !0),
    a
      ? n !== void 0
        ? t.addEventListener(e, l, { capture: !0, passive: n })
        : t.addEventListener(e, l, !0)
      : n !== void 0
        ? t.addEventListener(e, l, { passive: n })
        : t.addEventListener(e, l, !1));
}
function cc(t, e, l, a, n) {
  var u = a;
  if (!(e & 1) && !(e & 2) && a !== null)
    t: for (;;) {
      if (a === null) return;
      var i = a.tag;
      if (i === 3 || i === 4) {
        var c = a.stateNode.containerInfo;
        if (c === n) break;
        if (i === 4)
          for (i = a.return; i !== null; ) {
            var s = i.tag;
            if ((s === 3 || s === 4) && i.stateNode.containerInfo === n) return;
            i = i.return;
          }
        for (; c !== null; ) {
          if (((i = Fl(c)), i === null)) return;
          if (((s = i.tag), s === 5 || s === 6 || s === 26 || s === 27)) {
            a = u = i;
            continue t;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
  ud(function () {
    var f = u,
      d = Ms(l),
      y = [];
    t: {
      var m = Sd.get(t);
      if (m !== void 0) {
        var p = ri,
          T = t;
        switch (t) {
          case "keypress":
            if (hu(l) === 0) break t;
          case "keydown":
          case "keyup":
            p = cy;
            break;
          case "focusin":
            ((T = "focus"), (p = qi));
            break;
          case "focusout":
            ((T = "blur"), (p = qi));
            break;
          case "beforeblur":
          case "afterblur":
            p = qi;
            break;
          case "click":
            if (l.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = Qf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = $0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = ry;
            break;
          case pd:
          case gd:
          case vd:
            p = P0;
            break;
          case bd:
            p = dy;
            break;
          case "scroll":
          case "scrollend":
            p = K0;
            break;
          case "wheel":
            p = hy;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = ty;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = kf;
            break;
          case "toggle":
          case "beforetoggle":
            p = py;
        }
        var A = (e & 4) !== 0,
          R = !A && (t === "scroll" || t === "scrollend"),
          o = A ? (m !== null ? m + "Capture" : null) : m;
        A = [];
        for (var r = f, h; r !== null; ) {
          var b = r;
          if (
            ((h = b.stateNode),
            (b = b.tag),
            (b !== 5 && b !== 26 && b !== 27) ||
              h === null ||
              o === null ||
              ((b = hn(r, o)), b != null && A.push(En(r, b, h))),
            R)
          )
            break;
          r = r.return;
        }
        0 < A.length &&
          ((m = new p(m, T, null, l, d)), y.push({ event: m, listeners: A }));
      }
    }
    if (!(e & 7)) {
      t: {
        if (
          ((m = t === "mouseover" || t === "pointerover"),
          (p = t === "mouseout" || t === "pointerout"),
          m &&
            l !== Rc &&
            (T = l.relatedTarget || l.fromElement) &&
            (Fl(T) || T[Ma]))
        )
          break t;
        if (
          (p || m) &&
          ((m =
            d.window === d
              ? d
              : (m = d.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          p
            ? ((T = l.relatedTarget || l.toElement),
              (p = f),
              (T = T ? Fl(T) : null),
              T !== null &&
                ((R = Mn(T)),
                (A = T.tag),
                T !== R || (A !== 5 && A !== 27 && A !== 6)) &&
                (T = null))
            : ((p = null), (T = f)),
          p !== T)
        ) {
          if (
            ((A = Qf),
            (b = "onMouseLeave"),
            (o = "onMouseEnter"),
            (r = "mouse"),
            (t === "pointerout" || t === "pointerover") &&
              ((A = kf),
              (b = "onPointerLeave"),
              (o = "onPointerEnter"),
              (r = "pointer")),
            (R = p == null ? m : $a(p)),
            (h = T == null ? m : $a(T)),
            (m = new A(b, r + "leave", p, l, d)),
            (m.target = R),
            (m.relatedTarget = h),
            (b = null),
            Fl(d) === f &&
              ((A = new A(o, r + "enter", T, l, d)),
              (A.target = h),
              (A.relatedTarget = R),
              (b = A)),
            (R = b),
            p && T)
          )
            e: {
              for (A = p, o = T, r = 0, h = A; h; h = Gl(h)) r++;
              for (h = 0, b = o; b; b = Gl(b)) h++;
              for (; 0 < r - h; ) ((A = Gl(A)), r--);
              for (; 0 < h - r; ) ((o = Gl(o)), h--);
              for (; r--; ) {
                if (A === o || (o !== null && A === o.alternate)) break e;
                ((A = Gl(A)), (o = Gl(o)));
              }
              A = null;
            }
          else A = null;
          (p !== null && qr(y, m, p, A, !1),
            T !== null && R !== null && qr(y, R, T, A, !0));
        }
      }
      t: {
        if (
          ((m = f ? $a(f) : window),
          (p = m.nodeName && m.nodeName.toLowerCase()),
          p === "select" || (p === "input" && m.type === "file"))
        )
          var _ = $f;
        else if (Jf(m))
          if (od) _ = _y;
          else {
            _ = Ty;
            var N = Oy;
          }
        else
          ((p = m.nodeName),
            !p ||
            p.toLowerCase() !== "input" ||
            (m.type !== "checkbox" && m.type !== "radio")
              ? f && Ds(f.elementType) && (_ = $f)
              : (_ = Ry));
        if (_ && (_ = _(t, f))) {
          rd(y, _, l, d);
          break t;
        }
        (N && N(t, m, f),
          t === "focusout" &&
            f &&
            m.type === "number" &&
            f.memoizedProps.value != null &&
            Tc(m, "number", m.value));
      }
      switch (((N = f ? $a(f) : window), t)) {
        case "focusin":
          (Jf(N) || N.contentEditable === "true") &&
            ((Il = N), (Dc = f), (tn = null));
          break;
        case "focusout":
          tn = Dc = Il = null;
          break;
        case "mousedown":
          Mc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Mc = !1), tr(y, l, d));
          break;
        case "selectionchange":
          if (My) break;
        case "keydown":
        case "keyup":
          tr(y, l, d);
      }
      var D;
      if (zs)
        t: {
          switch (t) {
            case "compositionstart":
              var z = "onCompositionStart";
              break t;
            case "compositionend":
              z = "onCompositionEnd";
              break t;
            case "compositionupdate":
              z = "onCompositionUpdate";
              break t;
          }
          z = void 0;
        }
      else
        Pl
          ? sd(t, l) && (z = "onCompositionEnd")
          : t === "keydown" && l.keyCode === 229 && (z = "onCompositionStart");
      (z &&
        (cd &&
          l.locale !== "ko" &&
          (Pl || z !== "onCompositionStart"
            ? z === "onCompositionEnd" && Pl && (D = id())
            : ((Ie = d),
              (Ns = "value" in Ie ? Ie.value : Ie.textContent),
              (Pl = !0))),
        (N = Fu(f, z)),
        0 < N.length &&
          ((z = new Vf(z, t, null, l, d)),
          y.push({ event: z, listeners: N }),
          D ? (z.data = D) : ((D = fd(l)), D !== null && (z.data = D)))),
        (D = vy ? by(t, l) : Sy(t, l)) &&
          ((z = Fu(f, "onBeforeInput")),
          0 < z.length &&
            ((N = new Vf("onBeforeInput", "beforeinput", null, l, d)),
            y.push({ event: N, listeners: z }),
            (N.data = D))),
        r1(y, t, f, l, d));
    }
    lh(y, e);
  });
}
function En(t, e, l) {
  return { instance: t, listener: e, currentTarget: l };
}
function Fu(t, e) {
  for (var l = e + "Capture", a = []; t !== null; ) {
    var n = t,
      u = n.stateNode;
    if (
      ((n = n.tag),
      (n !== 5 && n !== 26 && n !== 27) ||
        u === null ||
        ((n = hn(t, l)),
        n != null && a.unshift(En(t, n, u)),
        (n = hn(t, e)),
        n != null && a.push(En(t, n, u))),
      t.tag === 3)
    )
      return a;
    t = t.return;
  }
  return [];
}
function Gl(t) {
  if (t === null) return null;
  do t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function qr(t, e, l, a, n) {
  for (var u = e._reactName, i = []; l !== null && l !== a; ) {
    var c = l,
      s = c.alternate,
      f = c.stateNode;
    if (((c = c.tag), s !== null && s === a)) break;
    ((c !== 5 && c !== 26 && c !== 27) ||
      f === null ||
      ((s = f),
      n
        ? ((f = hn(l, u)), f != null && i.unshift(En(l, f, s)))
        : n || ((f = hn(l, u)), f != null && i.push(En(l, f, s)))),
      (l = l.return));
  }
  i.length !== 0 && t.push({ event: e, listeners: i });
}
var h1 = /\r\n?/g,
  y1 = /\u0000|\uFFFD/g;
function Lr(t) {
  return (typeof t == "string" ? t : "" + t)
    .replace(
      h1,
      `
`,
    )
    .replace(y1, "");
}
function nh(t, e) {
  return ((e = Lr(e)), Lr(t) === e);
}
function Ai() {}
function P(t, e, l, a, n, u) {
  switch (l) {
    case "children":
      typeof a == "string"
        ? e === "body" || (e === "textarea" && a === "") || pa(t, a)
        : (typeof a == "number" || typeof a == "bigint") &&
          e !== "body" &&
          pa(t, "" + a);
      break;
    case "className":
      In(t, "class", a);
      break;
    case "tabIndex":
      In(t, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      In(t, l, a);
      break;
    case "style":
      nd(t, a, u);
      break;
    case "data":
      if (e !== "object") {
        In(t, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (e !== "a" || l !== "href")) {
        t.removeAttribute(l);
        break;
      }
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "symbol" ||
        typeof a == "boolean"
      ) {
        t.removeAttribute(l);
        break;
      }
      ((a = du("" + a)), t.setAttribute(l, a));
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        t.setAttribute(
          l,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof u == "function" &&
          (l === "formAction"
            ? (e !== "input" && P(t, e, "name", n.name, n, null),
              P(t, e, "formEncType", n.formEncType, n, null),
              P(t, e, "formMethod", n.formMethod, n, null),
              P(t, e, "formTarget", n.formTarget, n, null))
            : (P(t, e, "encType", n.encType, n, null),
              P(t, e, "method", n.method, n, null),
              P(t, e, "target", n.target, n, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(l);
        break;
      }
      ((a = du("" + a)), t.setAttribute(l, a));
      break;
    case "onClick":
      a != null && (t.onclick = Ai);
      break;
    case "onScroll":
      a != null && G("scroll", t);
      break;
    case "onScrollEnd":
      a != null && G("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(E(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(E(60));
          t.innerHTML = l;
        }
      }
      break;
    case "multiple":
      t.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      t.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "boolean" ||
        typeof a == "symbol"
      ) {
        t.removeAttribute("xlink:href");
        break;
      }
      ((l = du("" + a)),
        t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol"
        ? t.setAttribute(l, "" + a)
        : t.removeAttribute(l);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol"
        ? t.setAttribute(l, "")
        : t.removeAttribute(l);
      break;
    case "capture":
    case "download":
      a === !0
        ? t.setAttribute(l, "")
        : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? t.setAttribute(l, a)
          : t.removeAttribute(l);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null &&
      typeof a != "function" &&
      typeof a != "symbol" &&
      !isNaN(a) &&
      1 <= a
        ? t.setAttribute(l, a)
        : t.removeAttribute(l);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
        ? t.removeAttribute(l)
        : t.setAttribute(l, a);
      break;
    case "popover":
      (G("beforetoggle", t), G("toggle", t), ou(t, "popover", a));
      break;
    case "xlinkActuate":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      _e(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      _e(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      _e(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      _e(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      ou(t, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < l.length) ||
        (l[0] !== "o" && l[0] !== "O") ||
        (l[1] !== "n" && l[1] !== "N")) &&
        ((l = k0.get(l) || l), ou(t, l, a));
  }
}
function Ic(t, e, l, a, n, u) {
  switch (l) {
    case "style":
      nd(t, a, u);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(E(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(E(60));
          t.innerHTML = l;
        }
      }
      break;
    case "children":
      typeof a == "string"
        ? pa(t, a)
        : (typeof a == "number" || typeof a == "bigint") && pa(t, "" + a);
      break;
    case "onScroll":
      a != null && G("scroll", t);
      break;
    case "onScrollEnd":
      a != null && G("scrollend", t);
      break;
    case "onClick":
      a != null && (t.onclick = Ai);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!Po.hasOwnProperty(l))
        t: {
          if (
            l[0] === "o" &&
            l[1] === "n" &&
            ((n = l.endsWith("Capture")),
            (e = l.slice(2, n ? l.length - 7 : void 0)),
            (u = t[Gt] || null),
            (u = u != null ? u[l] : null),
            typeof u == "function" && t.removeEventListener(e, u, n),
            typeof a == "function")
          ) {
            (typeof u != "function" &&
              u !== null &&
              (l in t
                ? (t[l] = null)
                : t.hasAttribute(l) && t.removeAttribute(l)),
              t.addEventListener(e, a, n));
            break t;
          }
          l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, "") : ou(t, l, a);
        }
  }
}
function Nt(t, e, l) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (G("error", t), G("load", t));
      var a = !1,
        n = !1,
        u;
      for (u in l)
        if (l.hasOwnProperty(u)) {
          var i = l[u];
          if (i != null)
            switch (u) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(E(137, e));
              default:
                P(t, e, u, i, l, null);
            }
        }
      (n && P(t, e, "srcSet", l.srcSet, l, null),
        a && P(t, e, "src", l.src, l, null));
      return;
    case "input":
      G("invalid", t);
      var c = (u = i = n = null),
        s = null,
        f = null;
      for (a in l)
        if (l.hasOwnProperty(a)) {
          var d = l[a];
          if (d != null)
            switch (a) {
              case "name":
                n = d;
                break;
              case "type":
                i = d;
                break;
              case "checked":
                s = d;
                break;
              case "defaultChecked":
                f = d;
                break;
              case "value":
                u = d;
                break;
              case "defaultValue":
                c = d;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(E(137, e));
                break;
              default:
                P(t, e, a, d, l, null);
            }
        }
      (ed(t, u, c, s, f, i, n, !1), zu(t));
      return;
    case "select":
      (G("invalid", t), (a = i = u = null));
      for (n in l)
        if (l.hasOwnProperty(n) && ((c = l[n]), c != null))
          switch (n) {
            case "value":
              u = c;
              break;
            case "defaultValue":
              i = c;
              break;
            case "multiple":
              a = c;
            default:
              P(t, e, n, c, l, null);
          }
      ((e = u),
        (l = i),
        (t.multiple = !!a),
        e != null ? ca(t, !!a, e, !1) : l != null && ca(t, !!a, l, !0));
      return;
    case "textarea":
      (G("invalid", t), (u = n = a = null));
      for (i in l)
        if (l.hasOwnProperty(i) && ((c = l[i]), c != null))
          switch (i) {
            case "value":
              a = c;
              break;
            case "defaultValue":
              n = c;
              break;
            case "children":
              u = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(E(91));
              break;
            default:
              P(t, e, i, c, l, null);
          }
      (ad(t, a, n, u), zu(t));
      return;
    case "option":
      for (s in l)
        if (l.hasOwnProperty(s) && ((a = l[s]), a != null))
          switch (s) {
            case "selected":
              t.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              P(t, e, s, a, l, null);
          }
      return;
    case "dialog":
      (G("beforetoggle", t), G("toggle", t), G("cancel", t), G("close", t));
      break;
    case "iframe":
    case "object":
      G("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Sn.length; a++) G(Sn[a], t);
      break;
    case "image":
      (G("error", t), G("load", t));
      break;
    case "details":
      G("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      (G("error", t), G("load", t));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (f in l)
        if (l.hasOwnProperty(f) && ((a = l[f]), a != null))
          switch (f) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(E(137, e));
            default:
              P(t, e, f, a, l, null);
          }
      return;
    default:
      if (Ds(e)) {
        for (d in l)
          l.hasOwnProperty(d) &&
            ((a = l[d]), a !== void 0 && Ic(t, e, d, a, l, void 0));
        return;
      }
  }
  for (c in l)
    l.hasOwnProperty(c) && ((a = l[c]), a != null && P(t, e, c, a, l, null));
}
function p1(t, e, l, a) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var n = null,
        u = null,
        i = null,
        c = null,
        s = null,
        f = null,
        d = null;
      for (p in l) {
        var y = l[p];
        if (l.hasOwnProperty(p) && y != null)
          switch (p) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              s = y;
            default:
              a.hasOwnProperty(p) || P(t, e, p, null, a, y);
          }
      }
      for (var m in a) {
        var p = a[m];
        if (((y = l[m]), a.hasOwnProperty(m) && (p != null || y != null)))
          switch (m) {
            case "type":
              u = p;
              break;
            case "name":
              n = p;
              break;
            case "checked":
              f = p;
              break;
            case "defaultChecked":
              d = p;
              break;
            case "value":
              i = p;
              break;
            case "defaultValue":
              c = p;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(E(137, e));
              break;
            default:
              p !== y && P(t, e, m, p, a, y);
          }
      }
      Oc(t, i, c, s, f, d, u, n);
      return;
    case "select":
      p = i = c = m = null;
      for (u in l)
        if (((s = l[u]), l.hasOwnProperty(u) && s != null))
          switch (u) {
            case "value":
              break;
            case "multiple":
              p = s;
            default:
              a.hasOwnProperty(u) || P(t, e, u, null, a, s);
          }
      for (n in a)
        if (
          ((u = a[n]),
          (s = l[n]),
          a.hasOwnProperty(n) && (u != null || s != null))
        )
          switch (n) {
            case "value":
              m = u;
              break;
            case "defaultValue":
              c = u;
              break;
            case "multiple":
              i = u;
            default:
              u !== s && P(t, e, n, u, a, s);
          }
      ((e = c),
        (l = i),
        (a = p),
        m != null
          ? ca(t, !!l, m, !1)
          : !!a != !!l &&
            (e != null ? ca(t, !!l, e, !0) : ca(t, !!l, l ? [] : "", !1)));
      return;
    case "textarea":
      p = m = null;
      for (c in l)
        if (
          ((n = l[c]), l.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
        )
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              P(t, e, c, null, a, n);
          }
      for (i in a)
        if (
          ((n = a[i]),
          (u = l[i]),
          a.hasOwnProperty(i) && (n != null || u != null))
        )
          switch (i) {
            case "value":
              m = n;
              break;
            case "defaultValue":
              p = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(E(91));
              break;
            default:
              n !== u && P(t, e, i, n, a, u);
          }
      ld(t, m, p);
      return;
    case "option":
      for (var T in l)
        if (
          ((m = l[T]), l.hasOwnProperty(T) && m != null && !a.hasOwnProperty(T))
        )
          switch (T) {
            case "selected":
              t.selected = !1;
              break;
            default:
              P(t, e, T, null, a, m);
          }
      for (s in a)
        if (
          ((m = a[s]),
          (p = l[s]),
          a.hasOwnProperty(s) && m !== p && (m != null || p != null))
        )
          switch (s) {
            case "selected":
              t.selected = m && typeof m != "function" && typeof m != "symbol";
              break;
            default:
              P(t, e, s, m, a, p);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var A in l)
        ((m = l[A]),
          l.hasOwnProperty(A) &&
            m != null &&
            !a.hasOwnProperty(A) &&
            P(t, e, A, null, a, m));
      for (f in a)
        if (
          ((m = a[f]),
          (p = l[f]),
          a.hasOwnProperty(f) && m !== p && (m != null || p != null))
        )
          switch (f) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (m != null) throw Error(E(137, e));
              break;
            default:
              P(t, e, f, m, a, p);
          }
      return;
    default:
      if (Ds(e)) {
        for (var R in l)
          ((m = l[R]),
            l.hasOwnProperty(R) &&
              m !== void 0 &&
              !a.hasOwnProperty(R) &&
              Ic(t, e, R, void 0, a, m));
        for (d in a)
          ((m = a[d]),
            (p = l[d]),
            !a.hasOwnProperty(d) ||
              m === p ||
              (m === void 0 && p === void 0) ||
              Ic(t, e, d, m, a, p));
        return;
      }
  }
  for (var o in l)
    ((m = l[o]),
      l.hasOwnProperty(o) &&
        m != null &&
        !a.hasOwnProperty(o) &&
        P(t, e, o, null, a, m));
  for (y in a)
    ((m = a[y]),
      (p = l[y]),
      !a.hasOwnProperty(y) ||
        m === p ||
        (m == null && p == null) ||
        P(t, e, y, m, a, p));
}
var ts = null,
  es = null;
function Wu(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function jr(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function uh(t, e) {
  if (t === 0)
    switch (e) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return t === 1 && e === "foreignObject" ? 0 : t;
}
function ls(t, e) {
  return (
    t === "textarea" ||
    t === "noscript" ||
    typeof e.children == "string" ||
    typeof e.children == "number" ||
    typeof e.children == "bigint" ||
    (typeof e.dangerouslySetInnerHTML == "object" &&
      e.dangerouslySetInnerHTML !== null &&
      e.dangerouslySetInnerHTML.__html != null)
  );
}
var sc = null;
function g1() {
  var t = window.event;
  return t && t.type === "popstate"
    ? t === sc
      ? !1
      : ((sc = t), !0)
    : ((sc = null), !1);
}
var ih = typeof setTimeout == "function" ? setTimeout : void 0,
  v1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Yr = typeof Promise == "function" ? Promise : void 0,
  b1 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Yr < "u"
        ? function (t) {
            return Yr.resolve(null).then(t).catch(S1);
          }
        : ih;
function S1(t) {
  setTimeout(function () {
    throw t;
  });
}
function hl(t) {
  return t === "head";
}
function Xr(t, e) {
  var l = e,
    a = 0,
    n = 0;
  do {
    var u = l.nextSibling;
    if ((t.removeChild(l), u && u.nodeType === 8))
      if (((l = u.data), l === "/$")) {
        if (0 < a && 8 > a) {
          l = a;
          var i = t.ownerDocument;
          if ((l & 1 && dn(i.documentElement), l & 2 && dn(i.body), l & 4))
            for (l = i.head, dn(l), i = l.firstChild; i; ) {
              var c = i.nextSibling,
                s = i.nodeName;
              (i[Un] ||
                s === "SCRIPT" ||
                s === "STYLE" ||
                (s === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
                l.removeChild(i),
                (i = c));
            }
        }
        if (n === 0) {
          (t.removeChild(u), _n(e));
          return;
        }
        n--;
      } else
        l === "$" || l === "$?" || l === "$!"
          ? n++
          : (a = l.charCodeAt(0) - 48);
    else a = 0;
    l = u;
  } while (l);
  _n(e);
}
function as(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var l = e;
    switch (((e = e.nextSibling), l.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (as(l), _s(l));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (l.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(l);
  }
}
function E1(t, e, l, a) {
  for (; t.nodeType === 1; ) {
    var n = l;
    if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
      if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
    } else if (a) {
      if (!t[Un])
        switch (e) {
          case "meta":
            if (!t.hasAttribute("itemprop")) break;
            return t;
          case "link":
            if (
              ((u = t.getAttribute("rel")),
              u === "stylesheet" && t.hasAttribute("data-precedence"))
            )
              break;
            if (
              u !== n.rel ||
              t.getAttribute("href") !==
                (n.href == null || n.href === "" ? null : n.href) ||
              t.getAttribute("crossorigin") !==
                (n.crossOrigin == null ? null : n.crossOrigin) ||
              t.getAttribute("title") !== (n.title == null ? null : n.title)
            )
              break;
            return t;
          case "style":
            if (t.hasAttribute("data-precedence")) break;
            return t;
          case "script":
            if (
              ((u = t.getAttribute("src")),
              (u !== (n.src == null ? null : n.src) ||
                t.getAttribute("type") !== (n.type == null ? null : n.type) ||
                t.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin)) &&
                u &&
                t.hasAttribute("async") &&
                !t.hasAttribute("itemprop"))
            )
              break;
            return t;
          default:
            return t;
        }
    } else if (e === "input" && t.type === "hidden") {
      var u = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && t.getAttribute("name") === u) return t;
    } else return t;
    if (((t = de(t.nextSibling)), t === null)) break;
  }
  return null;
}
function A1(t, e, l) {
  if (e === "") return null;
  for (; t.nodeType !== 3; )
    if (
      ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
        !l) ||
      ((t = de(t.nextSibling)), t === null)
    )
      return null;
  return t;
}
function ns(t) {
  return (
    t.data === "$!" ||
    (t.data === "$?" && t.ownerDocument.readyState === "complete")
  );
}
function O1(t, e) {
  var l = t.ownerDocument;
  if (t.data !== "$?" || l.readyState === "complete") e();
  else {
    var a = function () {
      (e(), l.removeEventListener("DOMContentLoaded", a));
    };
    (l.addEventListener("DOMContentLoaded", a), (t._reactRetry = a));
  }
}
function de(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (
        ((e = t.data),
        e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
      )
        break;
      if (e === "/$") return null;
    }
  }
  return t;
}
var us = null;
function Gr(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var l = t.data;
      if (l === "$" || l === "$!" || l === "$?") {
        if (e === 0) return t;
        e--;
      } else l === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
function ch(t, e, l) {
  switch (((e = Wu(l)), t)) {
    case "html":
      if (((t = e.documentElement), !t)) throw Error(E(452));
      return t;
    case "head":
      if (((t = e.head), !t)) throw Error(E(453));
      return t;
    case "body":
      if (((t = e.body), !t)) throw Error(E(454));
      return t;
    default:
      throw Error(E(451));
  }
}
function dn(t) {
  for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
  _s(t);
}
var re = new Map(),
  Qr = new Set();
function Pu(t) {
  return typeof t.getRootNode == "function"
    ? t.getRootNode()
    : t.nodeType === 9
      ? t
      : t.ownerDocument;
}
var Xe = J.d;
J.d = { f: T1, r: R1, D: _1, C: D1, L: M1, m: N1, X: z1, S: C1, M: U1 };
function T1() {
  var t = Xe.f(),
    e = bi();
  return t || e;
}
function R1(t) {
  var e = Na(t);
  e !== null && e.tag === 5 && e.type === "form" ? tm(e) : Xe.r(t);
}
var Ua = typeof document > "u" ? null : document;
function sh(t, e, l) {
  var a = Ua;
  if (a && typeof e == "string" && e) {
    var n = ie(e);
    ((n = 'link[rel="' + t + '"][href="' + n + '"]'),
      typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
      Qr.has(n) ||
        (Qr.add(n),
        (t = { rel: t, crossOrigin: l, href: e }),
        a.querySelector(n) === null &&
          ((e = a.createElement("link")),
          Nt(e, "link", t),
          Ot(e),
          a.head.appendChild(e))));
  }
}
function _1(t) {
  (Xe.D(t), sh("dns-prefetch", t, null));
}
function D1(t, e) {
  (Xe.C(t, e), sh("preconnect", t, e));
}
function M1(t, e, l) {
  Xe.L(t, e, l);
  var a = Ua;
  if (a && t && e) {
    var n = 'link[rel="preload"][as="' + ie(e) + '"]';
    e === "image" && l && l.imageSrcSet
      ? ((n += '[imagesrcset="' + ie(l.imageSrcSet) + '"]'),
        typeof l.imageSizes == "string" &&
          (n += '[imagesizes="' + ie(l.imageSizes) + '"]'))
      : (n += '[href="' + ie(t) + '"]');
    var u = n;
    switch (e) {
      case "style":
        u = Ta(t);
        break;
      case "script":
        u = xa(t);
    }
    re.has(u) ||
      ((t = at(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e,
        },
        l,
      )),
      re.set(u, t),
      a.querySelector(n) !== null ||
        (e === "style" && a.querySelector(Gn(u))) ||
        (e === "script" && a.querySelector(Qn(u))) ||
        ((e = a.createElement("link")),
        Nt(e, "link", t),
        Ot(e),
        a.head.appendChild(e)));
  }
}
function N1(t, e) {
  Xe.m(t, e);
  var l = Ua;
  if (l && t) {
    var a = e && typeof e.as == "string" ? e.as : "script",
      n = 'link[rel="modulepreload"][as="' + ie(a) + '"][href="' + ie(t) + '"]',
      u = n;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        u = xa(t);
    }
    if (
      !re.has(u) &&
      ((t = at({ rel: "modulepreload", href: t }, e)),
      re.set(u, t),
      l.querySelector(n) === null)
    ) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (l.querySelector(Qn(u))) return;
      }
      ((a = l.createElement("link")),
        Nt(a, "link", t),
        Ot(a),
        l.head.appendChild(a));
    }
  }
}
function C1(t, e, l) {
  Xe.S(t, e, l);
  var a = Ua;
  if (a && t) {
    var n = ia(a).hoistableStyles,
      u = Ta(t);
    e = e || "default";
    var i = n.get(u);
    if (!i) {
      var c = { loading: 0, preload: null };
      if ((i = a.querySelector(Gn(u)))) c.loading = 5;
      else {
        ((t = at({ rel: "stylesheet", href: t, "data-precedence": e }, l)),
          (l = re.get(u)) && rf(t, l));
        var s = (i = a.createElement("link"));
        (Ot(s),
          Nt(s, "link", t),
          (s._p = new Promise(function (f, d) {
            ((s.onload = f), (s.onerror = d));
          })),
          s.addEventListener("load", function () {
            c.loading |= 1;
          }),
          s.addEventListener("error", function () {
            c.loading |= 2;
          }),
          (c.loading |= 4),
          Eu(i, e, a));
      }
      ((i = { type: "stylesheet", instance: i, count: 1, state: c }),
        n.set(u, i));
    }
  }
}
function z1(t, e) {
  Xe.X(t, e);
  var l = Ua;
  if (l && t) {
    var a = ia(l).hoistableScripts,
      n = xa(t),
      u = a.get(n);
    u ||
      ((u = l.querySelector(Qn(n))),
      u ||
        ((t = at({ src: t, async: !0 }, e)),
        (e = re.get(n)) && of(t, e),
        (u = l.createElement("script")),
        Ot(u),
        Nt(u, "link", t),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function U1(t, e) {
  Xe.M(t, e);
  var l = Ua;
  if (l && t) {
    var a = ia(l).hoistableScripts,
      n = xa(t),
      u = a.get(n);
    u ||
      ((u = l.querySelector(Qn(n))),
      u ||
        ((t = at({ src: t, async: !0, type: "module" }, e)),
        (e = re.get(n)) && of(t, e),
        (u = l.createElement("script")),
        Ot(u),
        Nt(u, "link", t),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function Vr(t, e, l, a) {
  var n = (n = ll.current) ? Pu(n) : null;
  if (!n) throw Error(E(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof l.precedence == "string" && typeof l.href == "string"
        ? ((e = Ta(l.href)),
          (l = ia(n).hoistableStyles),
          (a = l.get(e)),
          a ||
            ((a = { type: "style", instance: null, count: 0, state: null }),
            l.set(e, a)),
          a)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        l.rel === "stylesheet" &&
        typeof l.href == "string" &&
        typeof l.precedence == "string"
      ) {
        t = Ta(l.href);
        var u = ia(n).hoistableStyles,
          i = u.get(t);
        if (
          (i ||
            ((n = n.ownerDocument || n),
            (i = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            u.set(t, i),
            (u = n.querySelector(Gn(t))) &&
              !u._p &&
              ((i.instance = u), (i.state.loading = 5)),
            re.has(t) ||
              ((l = {
                rel: "preload",
                as: "style",
                href: l.href,
                crossOrigin: l.crossOrigin,
                integrity: l.integrity,
                media: l.media,
                hrefLang: l.hrefLang,
                referrerPolicy: l.referrerPolicy,
              }),
              re.set(t, l),
              u || x1(n, t, l, i.state))),
          e && a === null)
        )
          throw Error(E(528, ""));
        return i;
      }
      if (e && a !== null) throw Error(E(529, ""));
      return null;
    case "script":
      return (
        (e = l.async),
        (l = l.src),
        typeof l == "string" &&
        e &&
        typeof e != "function" &&
        typeof e != "symbol"
          ? ((e = xa(l)),
            (l = ia(n).hoistableScripts),
            (a = l.get(e)),
            a ||
              ((a = { type: "script", instance: null, count: 0, state: null }),
              l.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(E(444, t));
  }
}
function Ta(t) {
  return 'href="' + ie(t) + '"';
}
function Gn(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function fh(t) {
  return at({}, t, { "data-precedence": t.precedence, precedence: null });
}
function x1(t, e, l, a) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]")
    ? (a.loading = 1)
    : ((e = t.createElement("link")),
      (a.preload = e),
      e.addEventListener("load", function () {
        return (a.loading |= 1);
      }),
      e.addEventListener("error", function () {
        return (a.loading |= 2);
      }),
      Nt(e, "link", l),
      Ot(e),
      t.head.appendChild(e));
}
function xa(t) {
  return '[src="' + ie(t) + '"]';
}
function Qn(t) {
  return "script[async]" + t;
}
function kr(t, e, l) {
  if ((e.count++, e.instance === null))
    switch (e.type) {
      case "style":
        var a = t.querySelector('style[data-href~="' + ie(l.href) + '"]');
        if (a) return ((e.instance = a), Ot(a), a);
        var n = at({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null,
        });
        return (
          (a = (t.ownerDocument || t).createElement("style")),
          Ot(a),
          Nt(a, "style", n),
          Eu(a, l.precedence, t),
          (e.instance = a)
        );
      case "stylesheet":
        n = Ta(l.href);
        var u = t.querySelector(Gn(n));
        if (u) return ((e.state.loading |= 4), (e.instance = u), Ot(u), u);
        ((a = fh(l)),
          (n = re.get(n)) && rf(a, n),
          (u = (t.ownerDocument || t).createElement("link")),
          Ot(u));
        var i = u;
        return (
          (i._p = new Promise(function (c, s) {
            ((i.onload = c), (i.onerror = s));
          })),
          Nt(u, "link", a),
          (e.state.loading |= 4),
          Eu(u, l.precedence, t),
          (e.instance = u)
        );
      case "script":
        return (
          (u = xa(l.src)),
          (n = t.querySelector(Qn(u)))
            ? ((e.instance = n), Ot(n), n)
            : ((a = l),
              (n = re.get(u)) && ((a = at({}, l)), of(a, n)),
              (t = t.ownerDocument || t),
              (n = t.createElement("script")),
              Ot(n),
              Nt(n, "link", a),
              t.head.appendChild(n),
              (e.instance = n))
        );
      case "void":
        return null;
      default:
        throw Error(E(443, e.type));
    }
  else
    e.type === "stylesheet" &&
      !(e.state.loading & 4) &&
      ((a = e.instance), (e.state.loading |= 4), Eu(a, l.precedence, t));
  return e.instance;
}
function Eu(t, e, l) {
  for (
    var a = l.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      n = a.length ? a[a.length - 1] : null,
      u = n,
      i = 0;
    i < a.length;
    i++
  ) {
    var c = a[i];
    if (c.dataset.precedence === e) u = c;
    else if (u !== n) break;
  }
  u
    ? u.parentNode.insertBefore(t, u.nextSibling)
    : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
}
function rf(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.title == null && (t.title = e.title));
}
function of(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.integrity == null && (t.integrity = e.integrity));
}
var Au = null;
function Zr(t, e, l) {
  if (Au === null) {
    var a = new Map(),
      n = (Au = new Map());
    n.set(l, a);
  } else ((n = Au), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
  if (a.has(t)) return a;
  for (
    a.set(t, null), l = l.getElementsByTagName(t), n = 0;
    n < l.length;
    n++
  ) {
    var u = l[n];
    if (
      !(
        u[Un] ||
        u[zt] ||
        (t === "link" && u.getAttribute("rel") === "stylesheet")
      ) &&
      u.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var i = u.getAttribute(e) || "";
      i = t + i;
      var c = a.get(i);
      c ? c.push(u) : a.set(i, [u]);
    }
  }
  return a;
}
function Kr(t, e, l) {
  ((t = t.ownerDocument || t),
    t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null,
    ));
}
function w1(t, e, l) {
  if (l === 1 || e.itemProp != null) return !1;
  switch (t) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof e.precedence != "string" ||
        typeof e.href != "string" ||
        e.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof e.rel != "string" ||
        typeof e.href != "string" ||
        e.href === "" ||
        e.onLoad ||
        e.onError
      )
        break;
      switch (e.rel) {
        case "stylesheet":
          return (
            (t = e.disabled),
            typeof e.precedence == "string" && t == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        e.async &&
        typeof e.async != "function" &&
        typeof e.async != "symbol" &&
        !e.onLoad &&
        !e.onError &&
        e.src &&
        typeof e.src == "string"
      )
        return !0;
  }
  return !1;
}
function rh(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
var An = null;
function B1() {}
function H1(t, e, l) {
  if (An === null) throw Error(E(475));
  var a = An;
  if (
    e.type === "stylesheet" &&
    (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
    !(e.state.loading & 4)
  ) {
    if (e.instance === null) {
      var n = Ta(l.href),
        u = t.querySelector(Gn(n));
      if (u) {
        ((t = u._p),
          t !== null &&
            typeof t == "object" &&
            typeof t.then == "function" &&
            (a.count++, (a = Iu.bind(a)), t.then(a, a)),
          (e.state.loading |= 4),
          (e.instance = u),
          Ot(u));
        return;
      }
      ((u = t.ownerDocument || t),
        (l = fh(l)),
        (n = re.get(n)) && rf(l, n),
        (u = u.createElement("link")),
        Ot(u));
      var i = u;
      ((i._p = new Promise(function (c, s) {
        ((i.onload = c), (i.onerror = s));
      })),
        Nt(u, "link", l),
        (e.instance = u));
    }
    (a.stylesheets === null && (a.stylesheets = new Map()),
      a.stylesheets.set(e, t),
      (t = e.state.preload) &&
        !(e.state.loading & 3) &&
        (a.count++,
        (e = Iu.bind(a)),
        t.addEventListener("load", e),
        t.addEventListener("error", e)));
  }
}
function q1() {
  if (An === null) throw Error(E(475));
  var t = An;
  return (
    t.stylesheets && t.count === 0 && is(t, t.stylesheets),
    0 < t.count
      ? function (e) {
          var l = setTimeout(function () {
            if ((t.stylesheets && is(t, t.stylesheets), t.unsuspend)) {
              var a = t.unsuspend;
              ((t.unsuspend = null), a());
            }
          }, 6e4);
          return (
            (t.unsuspend = e),
            function () {
              ((t.unsuspend = null), clearTimeout(l));
            }
          );
        }
      : null
  );
}
function Iu() {
  if ((this.count--, this.count === 0)) {
    if (this.stylesheets) is(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      ((this.unsuspend = null), t());
    }
  }
}
var ti = null;
function is(t, e) {
  ((t.stylesheets = null),
    t.unsuspend !== null &&
      (t.count++, (ti = new Map()), e.forEach(L1, t), (ti = null), Iu.call(t)));
}
function L1(t, e) {
  if (!(e.state.loading & 4)) {
    var l = ti.get(t);
    if (l) var a = l.get(null);
    else {
      ((l = new Map()), ti.set(t, l));
      for (
        var n = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          u = 0;
        u < n.length;
        u++
      ) {
        var i = n[u];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
          (l.set(i.dataset.precedence, i), (a = i));
      }
      a && l.set(null, a);
    }
    ((n = e.instance),
      (i = n.getAttribute("data-precedence")),
      (u = l.get(i) || a),
      u === a && l.set(null, n),
      l.set(i, n),
      this.count++,
      (a = Iu.bind(this)),
      n.addEventListener("load", a),
      n.addEventListener("error", a),
      u
        ? u.parentNode.insertBefore(n, u.nextSibling)
        : ((t = t.nodeType === 9 ? t.head : t),
          t.insertBefore(n, t.firstChild)),
      (e.state.loading |= 4));
  }
}
var On = {
  $$typeof: Ce,
  Provider: null,
  Consumer: null,
  _currentValue: Ol,
  _currentValue2: Ol,
  _threadCount: 0,
};
function j1(t, e, l, a, n, u, i, c) {
  ((this.tag = 1),
    (this.containerInfo = t),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = Ci(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ci(0)),
    (this.hiddenUpdates = Ci(null)),
    (this.identifierPrefix = a),
    (this.onUncaughtError = n),
    (this.onCaughtError = u),
    (this.onRecoverableError = i),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = c),
    (this.incompleteTransitions = new Map()));
}
function oh(t, e, l, a, n, u, i, c, s, f, d, y) {
  return (
    (t = new j1(t, e, l, i, c, s, f, y)),
    (e = 1),
    u === !0 && (e |= 24),
    (u = $t(3, null, null, e)),
    (t.current = u),
    (u.stateNode = t),
    (e = Ls()),
    e.refCount++,
    (t.pooledCache = e),
    e.refCount++,
    (u.memoizedState = { element: a, isDehydrated: l, cache: e }),
    Ys(u),
    t
  );
}
function dh(t) {
  return t ? ((t = la), t) : la;
}
function mh(t, e, l, a, n, u) {
  ((n = dh(n)),
    a.context === null ? (a.context = n) : (a.pendingContext = n),
    (a = al(e)),
    (a.payload = { element: l }),
    (u = u === void 0 ? null : u),
    u !== null && (a.callback = u),
    (l = nl(t, a, e)),
    l !== null && (It(l, t, e), an(l, t, e)));
}
function Jr(t, e) {
  if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
    var l = t.retryLane;
    t.retryLane = l !== 0 && l < e ? l : e;
  }
}
function df(t, e) {
  (Jr(t, e), (t = t.alternate) && Jr(t, e));
}
function hh(t) {
  if (t.tag === 13) {
    var e = Ca(t, 67108864);
    (e !== null && It(e, t, 67108864), df(t, 67108864));
  }
}
var ei = !0;
function Y1(t, e, l, a) {
  var n = B.T;
  B.T = null;
  var u = J.p;
  try {
    ((J.p = 2), mf(t, e, l, a));
  } finally {
    ((J.p = u), (B.T = n));
  }
}
function X1(t, e, l, a) {
  var n = B.T;
  B.T = null;
  var u = J.p;
  try {
    ((J.p = 8), mf(t, e, l, a));
  } finally {
    ((J.p = u), (B.T = n));
  }
}
function mf(t, e, l, a) {
  if (ei) {
    var n = cs(a);
    if (n === null) (cc(t, e, a, li, l), $r(t, a));
    else if (Q1(n, t, e, l, a)) a.stopPropagation();
    else if (($r(t, a), e & 4 && -1 < G1.indexOf(t))) {
      for (; n !== null; ) {
        var u = Na(n);
        if (u !== null)
          switch (u.tag) {
            case 3:
              if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                var i = vl(u.pendingLanes);
                if (i !== 0) {
                  var c = u;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                    var s = 1 << (31 - Wt(i));
                    ((c.entanglements[1] |= s), (i &= ~s));
                  }
                  (Ae(u), !(F & 6) && ((Zu = be() + 500), Xn(0)));
                }
              }
              break;
            case 13:
              ((c = Ca(u, 2)), c !== null && It(c, u, 2), bi(), df(u, 2));
          }
        if (((u = cs(a)), u === null && cc(t, e, a, li, l), u === n)) break;
        n = u;
      }
      n !== null && a.stopPropagation();
    } else cc(t, e, a, null, l);
  }
}
function cs(t) {
  return ((t = Ms(t)), hf(t));
}
var li = null;
function hf(t) {
  if (((li = null), (t = Fl(t)), t !== null)) {
    var e = Mn(t);
    if (e === null) t = null;
    else {
      var l = e.tag;
      if (l === 13) {
        if (((t = jo(e)), t !== null)) return t;
        t = null;
      } else if (l === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated)
          return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return ((li = t), null);
}
function yh(t) {
  switch (t) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (D0()) {
        case Qo:
          return 2;
        case Vo:
          return 8;
        case Cu:
        case M0:
          return 32;
        case ko:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var ss = !1,
  cl = null,
  sl = null,
  fl = null,
  Tn = new Map(),
  Rn = new Map(),
  We = [],
  G1 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function $r(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      cl = null;
      break;
    case "dragenter":
    case "dragleave":
      sl = null;
      break;
    case "mouseover":
    case "mouseout":
      fl = null;
      break;
    case "pointerover":
    case "pointerout":
      Tn.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Rn.delete(e.pointerId);
  }
}
function Va(t, e, l, a, n, u) {
  return t === null || t.nativeEvent !== u
    ? ((t = {
        blockedOn: e,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [n],
      }),
      e !== null && ((e = Na(e)), e !== null && hh(e)),
      t)
    : ((t.eventSystemFlags |= a),
      (e = t.targetContainers),
      n !== null && e.indexOf(n) === -1 && e.push(n),
      t);
}
function Q1(t, e, l, a, n) {
  switch (e) {
    case "focusin":
      return ((cl = Va(cl, t, e, l, a, n)), !0);
    case "dragenter":
      return ((sl = Va(sl, t, e, l, a, n)), !0);
    case "mouseover":
      return ((fl = Va(fl, t, e, l, a, n)), !0);
    case "pointerover":
      var u = n.pointerId;
      return (Tn.set(u, Va(Tn.get(u) || null, t, e, l, a, n)), !0);
    case "gotpointercapture":
      return (
        (u = n.pointerId),
        Rn.set(u, Va(Rn.get(u) || null, t, e, l, a, n)),
        !0
      );
  }
  return !1;
}
function ph(t) {
  var e = Fl(t.target);
  if (e !== null) {
    var l = Mn(e);
    if (l !== null) {
      if (((e = l.tag), e === 13)) {
        if (((e = jo(l)), e !== null)) {
          ((t.blockedOn = e),
            H0(t.priority, function () {
              if (l.tag === 13) {
                var a = Pt();
                a = Ts(a);
                var n = Ca(l, a);
                (n !== null && It(n, l, a), df(l, a));
              }
            }));
          return;
        }
      } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function Ou(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var l = cs(t.nativeEvent);
    if (l === null) {
      l = t.nativeEvent;
      var a = new l.constructor(l.type, l);
      ((Rc = a), l.target.dispatchEvent(a), (Rc = null));
    } else return ((e = Na(l)), e !== null && hh(e), (t.blockedOn = l), !1);
    e.shift();
  }
  return !0;
}
function Fr(t, e, l) {
  Ou(t) && l.delete(e);
}
function V1() {
  ((ss = !1),
    cl !== null && Ou(cl) && (cl = null),
    sl !== null && Ou(sl) && (sl = null),
    fl !== null && Ou(fl) && (fl = null),
    Tn.forEach(Fr),
    Rn.forEach(Fr));
}
function cu(t, e) {
  t.blockedOn === e &&
    ((t.blockedOn = null),
    ss ||
      ((ss = !0),
      bt.unstable_scheduleCallback(bt.unstable_NormalPriority, V1)));
}
var su = null;
function Wr(t) {
  su !== t &&
    ((su = t),
    bt.unstable_scheduleCallback(bt.unstable_NormalPriority, function () {
      su === t && (su = null);
      for (var e = 0; e < t.length; e += 3) {
        var l = t[e],
          a = t[e + 1],
          n = t[e + 2];
        if (typeof a != "function") {
          if (hf(a || l) === null) continue;
          break;
        }
        var u = Na(l);
        u !== null &&
          (t.splice(e, 3),
          (e -= 3),
          Xc(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
      }
    }));
}
function _n(t) {
  function e(s) {
    return cu(s, t);
  }
  (cl !== null && cu(cl, t),
    sl !== null && cu(sl, t),
    fl !== null && cu(fl, t),
    Tn.forEach(e),
    Rn.forEach(e));
  for (var l = 0; l < We.length; l++) {
    var a = We[l];
    a.blockedOn === t && (a.blockedOn = null);
  }
  for (; 0 < We.length && ((l = We[0]), l.blockedOn === null); )
    (ph(l), l.blockedOn === null && We.shift());
  if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
    for (a = 0; a < l.length; a += 3) {
      var n = l[a],
        u = l[a + 1],
        i = n[Gt] || null;
      if (typeof u == "function") i || Wr(l);
      else if (i) {
        var c = null;
        if (u && u.hasAttribute("formAction")) {
          if (((n = u), (i = u[Gt] || null))) c = i.formAction;
          else if (hf(n) !== null) continue;
        } else c = i.action;
        (typeof c == "function" ? (l[a + 1] = c) : (l.splice(a, 3), (a -= 3)),
          Wr(l));
      }
    }
}
function yf(t) {
  this._internalRoot = t;
}
Oi.prototype.render = yf.prototype.render = function (t) {
  var e = this._internalRoot;
  if (e === null) throw Error(E(409));
  var l = e.current,
    a = Pt();
  mh(l, a, t, e, null, null);
};
Oi.prototype.unmount = yf.prototype.unmount = function () {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    (mh(t.current, 2, null, t, null, null), bi(), (e[Ma] = null));
  }
};
function Oi(t) {
  this._internalRoot = t;
}
Oi.prototype.unstable_scheduleHydration = function (t) {
  if (t) {
    var e = Fo();
    t = { blockedOn: null, target: t, priority: e };
    for (var l = 0; l < We.length && e !== 0 && e < We[l].priority; l++);
    (We.splice(l, 0, t), l === 0 && ph(t));
  }
};
var Pr = qo.version;
if (Pr !== "19.1.0") throw Error(E(527, Pr, "19.1.0"));
J.findDOMNode = function (t) {
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function"
      ? Error(E(188))
      : ((t = Object.keys(t).join(",")), Error(E(268, t)));
  return (
    (t = S0(e)),
    (t = t !== null ? Yo(t) : null),
    (t = t === null ? null : t.stateNode),
    t
  );
};
var k1 = {
  bundleType: 0,
  version: "19.1.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: B,
  reconcilerVersion: "19.1.0",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var fu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!fu.isDisabled && fu.supportsFiber)
    try {
      ((Nn = fu.inject(k1)), (Ft = fu));
    } catch {}
}
ci.createRoot = function (t, e) {
  if (!Lo(t)) throw Error(E(299));
  var l = !1,
    a = "",
    n = om,
    u = dm,
    i = mm,
    c = null;
  return (
    e != null &&
      (e.unstable_strictMode === !0 && (l = !0),
      e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
      e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
      e.onCaughtError !== void 0 && (u = e.onCaughtError),
      e.onRecoverableError !== void 0 && (i = e.onRecoverableError),
      e.unstable_transitionCallbacks !== void 0 &&
        (c = e.unstable_transitionCallbacks)),
    (e = oh(t, 1, !1, null, null, l, a, n, u, i, c, null)),
    (t[Ma] = e.current),
    ff(t),
    new yf(e)
  );
};
ci.hydrateRoot = function (t, e, l) {
  if (!Lo(t)) throw Error(E(299));
  var a = !1,
    n = "",
    u = om,
    i = dm,
    c = mm,
    s = null,
    f = null;
  return (
    l != null &&
      (l.unstable_strictMode === !0 && (a = !0),
      l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
      l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
      l.onCaughtError !== void 0 && (i = l.onCaughtError),
      l.onRecoverableError !== void 0 && (c = l.onRecoverableError),
      l.unstable_transitionCallbacks !== void 0 &&
        (s = l.unstable_transitionCallbacks),
      l.formState !== void 0 && (f = l.formState)),
    (e = oh(t, 1, !0, e, l ?? null, a, n, u, i, c, s, f)),
    (e.context = dh(null)),
    (l = e.current),
    (a = Pt()),
    (a = Ts(a)),
    (n = al(a)),
    (n.callback = null),
    nl(l, n, a),
    (l = a),
    (e.current.lanes = l),
    zn(e, l),
    Ae(e),
    (t[Ma] = e.current),
    ff(t),
    new Oi(e)
  );
};
ci.version = "19.1.0";
function gh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gh);
    } catch (t) {
      console.error(t);
    }
}
(gh(), (zo.exports = ci));
var Z1 = zo.exports;
const K1 = Oo(Z1);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const J1 = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  vh = (...t) =>
    t
      .filter((e, l, a) => !!e && e.trim() !== "" && a.indexOf(e) === l)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var $1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const F1 = L.forwardRef(
  (
    {
      color: t = "currentColor",
      size: e = 24,
      strokeWidth: l = 2,
      absoluteStrokeWidth: a,
      className: n = "",
      children: u,
      iconNode: i,
      ...c
    },
    s,
  ) =>
    L.createElement(
      "svg",
      {
        ref: s,
        ...$1,
        width: e,
        height: e,
        stroke: t,
        strokeWidth: a ? (Number(l) * 24) / Number(e) : l,
        className: vh("lucide", n),
        ...c,
      },
      [
        ...i.map(([f, d]) => L.createElement(f, d)),
        ...(Array.isArray(u) ? u : [u]),
      ],
    ),
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z = (t, e) => {
  const l = L.forwardRef(({ className: a, ...n }, u) =>
    L.createElement(F1, {
      ref: u,
      iconNode: e,
      className: vh(`lucide-${J1(t)}`, a),
      ...n,
    }),
  );
  return ((l.displayName = `${t}`), l);
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W1 = Z("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const P1 = Z("Boxes", [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w",
    },
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat",
    },
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf",
    },
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const I1 = Z("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bh = Z("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tp = Z("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ep = Z("CreditCard", [
  [
    "rect",
    { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
  ],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lp = Z("Database", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ap = Z("FileQuestion", [
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
      key: "1mlx9k",
    },
  ],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const np = Z("FileText", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const up = Z("Headphones", [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ip = Z("Image", [
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      ry: "2",
      key: "1m3agn",
    },
  ],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Sh = Z("IndianRupee", [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Eh = Z("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fs = Z("KeyRound", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t",
    },
  ],
  [
    "circle",
    { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cp = Z("LayoutDashboard", [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  [
    "rect",
    { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" },
  ],
  [
    "rect",
    { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" },
  ],
  [
    "rect",
    { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sp = Z("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1",
    },
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fp = Z("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rp = Z("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const op = Z("Megaphone", [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dp = Z("PackageCheck", [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h",
    },
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mp = Z("PackagePlus", [
  ["path", { d: "M16 16h6", key: "100bgy" }],
  ["path", { d: "M19 13v6", key: "85cyf1" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h",
    },
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hp = Z("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yp = Z("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pp = Z("RefreshCcw", [
  [
    "path",
    { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  [
    "path",
    { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" },
  ],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gp = Z("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476",
    },
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vp = Z("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bp = Z("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Sp = Z("Timer", [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ep = Z("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ir = Z("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq",
    },
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ah = Z("Truck", [
  [
    "path",
    {
      d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
      key: "wrbu53",
    },
  ],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i",
    },
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Oh = Z("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pf = Z("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
function Th(t, e) {
  return function () {
    return t.apply(e, arguments);
  };
}
const { toString: Ap } = Object.prototype,
  { getPrototypeOf: Ra } = Object,
  { iterator: Vn, toStringTag: Rh } = Symbol,
  ai = (
    ({ hasOwnProperty: t }) =>
    (e, l) =>
      t.call(e, l)
  )(Object.prototype),
  Dn = (t, e) => {
    let l = t;
    const a = [];
    for (; l != null && l !== Object.prototype; ) {
      if (a.indexOf(l) !== -1) return !1;
      if ((a.push(l), ai(l, e))) return !0;
      l = Ra(l);
    }
    return !1;
  },
  Op = (t, e) => (t != null && Dn(t, e) ? t[e] : void 0),
  gf = ((t) => (e) => {
    const l = Ap.call(e);
    return t[l] || (t[l] = l.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  he = (t) => ((t = t.toLowerCase()), (e) => gf(e) === t),
  Ti = (t) => (e) => typeof e === t,
  { isArray: Bl } = Array,
  _a = Ti("undefined");
function wa(t) {
  return (
    t !== null &&
    !_a(t) &&
    t.constructor !== null &&
    !_a(t.constructor) &&
    Xt(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  );
}
const _h = he("ArrayBuffer");
function Tp(t) {
  let e;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (e = ArrayBuffer.isView(t))
      : (e = t && t.buffer && _h(t.buffer)),
    e
  );
}
const Rp = Ti("string"),
  Xt = Ti("function"),
  Dh = Ti("number"),
  Ba = (t) => t !== null && typeof t == "object",
  _p = (t) => t === !0 || t === !1,
  Tu = (t) => {
    if (!Ba(t)) return !1;
    const e = Ra(t);
    return (
      (e === null || e === Object.prototype || Ra(e) === null) &&
      !Dn(t, Rh) &&
      !Dn(t, Vn)
    );
  },
  Dp = (t) => {
    if (!Ba(t) || wa(t)) return !1;
    try {
      return (
        Object.keys(t).length === 0 &&
        Object.getPrototypeOf(t) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Mp = he("Date"),
  Np = he("File"),
  Cp = (t) => !!(t && typeof t.uri < "u"),
  zp = (t) => t && typeof t.getParts < "u",
  Up = he("Blob"),
  xp = he("FileList"),
  wp = (t) => Ba(t) && Xt(t.pipe);
function Bp() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : {};
}
const to = Bp(),
  eo = typeof to.FormData < "u" ? to.FormData : void 0,
  Hp = (t) => {
    if (!t) return !1;
    if (eo && t instanceof eo) return !0;
    const e = Ra(t);
    if (!e || e === Object.prototype || !Xt(t.append)) return !1;
    const l = gf(t);
    return (
      l === "formdata" ||
      (l === "object" && Xt(t.toString) && t.toString() === "[object FormData]")
    );
  },
  qp = he("URLSearchParams"),
  [Lp, jp, Yp, Xp] = ["ReadableStream", "Request", "Response", "Headers"].map(
    he,
  ),
  Gp = (t) =>
    t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function kn(t, e, { allOwnKeys: l = !1 } = {}) {
  if (t === null || typeof t > "u") return;
  let a, n;
  if ((typeof t != "object" && (t = [t]), Bl(t)))
    for (a = 0, n = t.length; a < n; a++) e.call(null, t[a], a, t);
  else {
    if (wa(t)) return;
    const u = l ? Object.getOwnPropertyNames(t) : Object.keys(t),
      i = u.length;
    let c;
    for (a = 0; a < i; a++) ((c = u[a]), e.call(null, t[c], c, t));
  }
}
function Mh(t, e) {
  if (wa(t)) return null;
  e = e.toLowerCase();
  const l = Object.keys(t);
  let a = l.length,
    n;
  for (; a-- > 0; ) if (((n = l[a]), e === n.toLowerCase())) return n;
  return null;
}
const El =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Nh = (t) => !_a(t) && t !== El;
function rs(...t) {
  const { caseless: e, skipUndefined: l } = (Nh(this) && this) || {},
    a = {},
    n = (u, i) => {
      if (i === "__proto__" || i === "constructor" || i === "prototype") return;
      const c = (e && typeof i == "string" && Mh(a, i)) || i,
        s = ai(a, c) ? a[c] : void 0;
      Tu(s) && Tu(u)
        ? (a[c] = rs(s, u))
        : Tu(u)
          ? (a[c] = rs({}, u))
          : Bl(u)
            ? (a[c] = u.slice())
            : (!l || !_a(u)) && (a[c] = u);
    };
  for (let u = 0, i = t.length; u < i; u++) {
    const c = t[u];
    if (!c || wa(c) || (kn(c, n), typeof c != "object" || Bl(c))) continue;
    const s = Object.getOwnPropertySymbols(c);
    for (let f = 0; f < s.length; f++) {
      const d = s[f];
      tg.call(c, d) && n(c[d], d);
    }
  }
  return a;
}
const Qp = (t, e, l, { allOwnKeys: a } = {}) => (
    kn(
      e,
      (n, u) => {
        l && Xt(n)
          ? Object.defineProperty(t, u, {
              __proto__: null,
              value: Th(n, l),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(t, u, {
              __proto__: null,
              value: n,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: a },
    ),
    t
  ),
  Vp = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
  kp = (t, e, l, a) => {
    ((t.prototype = Object.create(e.prototype, a)),
      Object.defineProperty(t.prototype, "constructor", {
        __proto__: null,
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "super", {
        __proto__: null,
        value: e.prototype,
      }),
      l && Object.assign(t.prototype, l));
  },
  Zp = (t, e, l, a) => {
    let n, u, i;
    const c = {};
    if (((e = e || {}), t == null)) return e;
    do {
      for (n = Object.getOwnPropertyNames(t), u = n.length; u-- > 0; )
        ((i = n[u]),
          (!a || a(i, t, e)) && !c[i] && ((e[i] = t[i]), (c[i] = !0)));
      t = l !== !1 && Ra(t);
    } while (t && (!l || l(t, e)) && t !== Object.prototype);
    return e;
  },
  Kp = (t, e, l) => {
    ((t = String(t)),
      (l === void 0 || l > t.length) && (l = t.length),
      (l -= e.length));
    const a = t.indexOf(e, l);
    return a !== -1 && a === l;
  },
  Jp = (t) => {
    if (!t) return null;
    if (Bl(t)) return t;
    let e = t.length;
    if (!Dh(e)) return null;
    const l = new Array(e);
    for (; e-- > 0; ) l[e] = t[e];
    return l;
  },
  $p = (
    (t) => (e) =>
      t && e instanceof t
  )(typeof Uint8Array < "u" && Ra(Uint8Array)),
  Fp = (t, e) => {
    const a = (t && t[Vn]).call(t);
    let n;
    for (; (n = a.next()) && !n.done; ) {
      const u = n.value;
      e.call(t, u[0], u[1]);
    }
  },
  Wp = (t, e) => {
    let l;
    const a = [];
    for (; (l = t.exec(e)) !== null; ) a.push(l);
    return a;
  },
  Pp = he("HTMLFormElement"),
  Ip = (t) =>
    t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (l, a, n) {
      return a.toUpperCase() + n;
    }),
  { propertyIsEnumerable: tg } = Object.prototype,
  eg = he("RegExp"),
  Ch = (t, e) => {
    const l = Object.getOwnPropertyDescriptors(t),
      a = {};
    (kn(l, (n, u) => {
      let i;
      (i = e(n, u, t)) !== !1 && (a[u] = i || n);
    }),
      Object.defineProperties(t, a));
  },
  lg = (t) => {
    Ch(t, (e, l) => {
      if (Xt(t) && ["arguments", "caller", "callee"].includes(l)) return !1;
      const a = t[l];
      if (Xt(a)) {
        if (((e.enumerable = !1), "writable" in e)) {
          e.writable = !1;
          return;
        }
        e.set ||
          (e.set = () => {
            throw Error("Can not rewrite read-only method '" + l + "'");
          });
      }
    });
  },
  ag = (t, e) => {
    const l = {},
      a = (n) => {
        n.forEach((u) => {
          l[u] = !0;
        });
      };
    return (Bl(t) ? a(t) : a(String(t).split(e)), l);
  },
  ng = () => {},
  ug = (t, e) => (t != null && Number.isFinite((t = +t)) ? t : e);
function ig(t) {
  return !!(t && Xt(t.append) && t[Rh] === "FormData" && t[Vn]);
}
const cg = (t) => {
    const e = new WeakSet(),
      l = (a) => {
        if (Ba(a)) {
          if (e.has(a)) return;
          if (wa(a)) return a;
          if (!("toJSON" in a)) {
            e.add(a);
            const n = Bl(a) ? [] : {};
            return (
              kn(a, (u, i) => {
                const c = l(u);
                !_a(c) && (n[i] = c);
              }),
              e.delete(a),
              n
            );
          }
        }
        return a;
      };
    return l(t);
  },
  sg = he("AsyncFunction"),
  fg = (t) => t && (Ba(t) || Xt(t)) && Xt(t.then) && Xt(t.catch),
  zh = ((t, e) =>
    t
      ? setImmediate
      : e
        ? ((l, a) => (
            El.addEventListener(
              "message",
              ({ source: n, data: u }) => {
                n === El && u === l && a.length && a.shift()();
              },
              !1,
            ),
            (n) => {
              (a.push(n), El.postMessage(l, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (l) => setTimeout(l))(
    typeof setImmediate == "function",
    Xt(El.postMessage),
  ),
  rg =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(El)
      : (typeof process < "u" && process.nextTick) || zh,
  Uh = (t) => t != null && Xt(t[Vn]),
  og = (t) => t != null && Dn(t, Vn) && Uh(t),
  g = {
    isArray: Bl,
    isArrayBuffer: _h,
    isBuffer: wa,
    isFormData: Hp,
    isArrayBufferView: Tp,
    isString: Rp,
    isNumber: Dh,
    isBoolean: _p,
    isObject: Ba,
    isPlainObject: Tu,
    isEmptyObject: Dp,
    isReadableStream: Lp,
    isRequest: jp,
    isResponse: Yp,
    isHeaders: Xp,
    isUndefined: _a,
    isDate: Mp,
    isFile: Np,
    isReactNativeBlob: Cp,
    isReactNative: zp,
    isBlob: Up,
    isRegExp: eg,
    isFunction: Xt,
    isStream: wp,
    isURLSearchParams: qp,
    isTypedArray: $p,
    isFileList: xp,
    forEach: kn,
    merge: rs,
    extend: Qp,
    trim: Gp,
    stripBOM: Vp,
    inherits: kp,
    toFlatObject: Zp,
    kindOf: gf,
    kindOfTest: he,
    endsWith: Kp,
    toArray: Jp,
    forEachEntry: Fp,
    matchAll: Wp,
    isHTMLForm: Pp,
    hasOwnProperty: ai,
    hasOwnProp: ai,
    hasOwnInPrototypeChain: Dn,
    getSafeProp: Op,
    reduceDescriptors: Ch,
    freezeMethods: lg,
    toObjectSet: ag,
    toCamelCase: Ip,
    noop: ng,
    toFiniteNumber: ug,
    findKey: Mh,
    global: El,
    isContextDefined: Nh,
    isSpecCompliantForm: ig,
    toJSONObject: cg,
    isAsyncFn: sg,
    isThenable: fg,
    setImmediate: zh,
    asap: rg,
    isIterable: Uh,
    isSafeIterable: og,
  },
  dg = g.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  mg = (t) => {
    const e = {};
    let l, a, n;
    return (
      t &&
        t
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((n = i.indexOf(":")),
              (l = i.substring(0, n).trim().toLowerCase()),
              (a = i.substring(n + 1).trim()),
              !(!l || (e[l] && dg[l])) &&
                (l === "set-cookie"
                  ? e[l]
                    ? e[l].push(a)
                    : (e[l] = [a])
                  : (e[l] = e[l] ? e[l] + ", " + a : a)));
          }),
      e
    );
  };
function hg(t) {
  let e = 0,
    l = t.length;
  for (; e < l; ) {
    const a = t.charCodeAt(e);
    if (a !== 9 && a !== 32) break;
    e += 1;
  }
  for (; l > e; ) {
    const a = t.charCodeAt(l - 1);
    if (a !== 9 && a !== 32) break;
    l -= 1;
  }
  return e === 0 && l === t.length ? t : t.slice(e, l);
}
const yg = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"),
  pg = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function vf(t, e) {
  return g.isArray(t) ? t.map((l) => vf(l, e)) : hg(String(t).replace(e, ""));
}
const gg = (t) => vf(t, yg),
  vg = (t) => vf(t, pg);
function xh(t) {
  const e = Object.create(null);
  return (
    g.forEach(t.toJSON(), (l, a) => {
      e[a] = vg(l);
    }),
    e
  );
}
const lo = Symbol("internals");
function ka(t) {
  return t && String(t).trim().toLowerCase();
}
function Ru(t) {
  return t === !1 || t == null ? t : g.isArray(t) ? t.map(Ru) : gg(String(t));
}
function bg(t) {
  const e = Object.create(null),
    l = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; (a = l.exec(t)); ) e[a[1]] = a[2];
  return e;
}
const Sg = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function fc(t, e, l, a, n) {
  if (g.isFunction(a)) return a.call(this, e, l);
  if ((n && (e = l), !!g.isString(e))) {
    if (g.isString(a)) return e.indexOf(a) !== -1;
    if (g.isRegExp(a)) return a.test(e);
  }
}
function Eg(t) {
  return t
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (e, l, a) => l.toUpperCase() + a);
}
function Ag(t, e) {
  const l = g.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(t, a + l, {
      __proto__: null,
      value: function (n, u, i) {
        return this[a].call(this, e, n, u, i);
      },
      configurable: !0,
    });
  });
}
let xt = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, l, a) {
    const n = this;
    function u(c, s, f) {
      const d = ka(s);
      if (!d) return;
      const y = g.findKey(n, d);
      (!y || n[y] === void 0 || f === !0 || (f === void 0 && n[y] !== !1)) &&
        (n[y || s] = Ru(c));
    }
    const i = (c, s) => g.forEach(c, (f, d) => u(f, d, s));
    if (g.isPlainObject(e) || e instanceof this.constructor) i(e, l);
    else if (g.isString(e) && (e = e.trim()) && !Sg(e)) i(mg(e), l);
    else if (g.isObject(e) && g.isSafeIterable(e)) {
      let c = Object.create(null),
        s,
        f;
      for (const d of e) {
        if (!g.isArray(d))
          throw new TypeError("Object iterator must return a key-value pair");
        ((f = d[0]),
          g.hasOwnProp(c, f)
            ? ((s = c[f]), (c[f] = g.isArray(s) ? [...s, d[1]] : [s, d[1]]))
            : (c[f] = d[1]));
      }
      i(c, l);
    } else e != null && u(l, e, a);
    return this;
  }
  get(e, l) {
    if (((e = ka(e)), e)) {
      const a = g.findKey(this, e);
      if (a) {
        const n = this[a];
        if (!l) return n;
        if (l === !0) return bg(n);
        if (g.isFunction(l)) return l.call(this, n, a);
        if (g.isRegExp(l)) return l.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, l) {
    if (((e = ka(e)), e)) {
      const a = g.findKey(this, e);
      return !!(a && this[a] !== void 0 && (!l || fc(this, this[a], a, l)));
    }
    return !1;
  }
  delete(e, l) {
    const a = this;
    let n = !1;
    function u(i) {
      if (((i = ka(i)), i)) {
        const c = g.findKey(a, i);
        c && (!l || fc(a, a[c], c, l)) && (delete a[c], (n = !0));
      }
    }
    return (g.isArray(e) ? e.forEach(u) : u(e), n);
  }
  clear(e) {
    const l = Object.keys(this);
    let a = l.length,
      n = !1;
    for (; a--; ) {
      const u = l[a];
      (!e || fc(this, this[u], u, e, !0)) && (delete this[u], (n = !0));
    }
    return n;
  }
  normalize(e) {
    const l = this,
      a = {};
    return (
      g.forEach(this, (n, u) => {
        const i = g.findKey(a, u);
        if (i) {
          ((l[i] = Ru(n)), delete l[u]);
          return;
        }
        const c = e ? Eg(u) : String(u).trim();
        (c !== u && delete l[u], (l[c] = Ru(n)), (a[c] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const l = Object.create(null);
    return (
      g.forEach(this, (a, n) => {
        a != null && a !== !1 && (l[n] = e && g.isArray(a) ? a.join(", ") : a);
      }),
      l
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, l]) => e + ": " + l).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...l) {
    const a = new this(e);
    return (l.forEach((n) => a.set(n)), a);
  }
  static accessor(e) {
    const a = (this[lo] = this[lo] = { accessors: {} }).accessors,
      n = this.prototype;
    function u(i) {
      const c = ka(i);
      a[c] || (Ag(n, i), (a[c] = !0));
    }
    return (g.isArray(e) ? e.forEach(u) : u(e), this);
  }
};
xt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
g.reduceDescriptors(xt.prototype, ({ value: t }, e) => {
  let l = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(a) {
      this[l] = a;
    },
  };
});
g.freezeMethods(xt);
const Og = "[REDACTED ****]";
function Tg(t) {
  if (g.hasOwnProp(t, "toJSON")) return !0;
  let e = Object.getPrototypeOf(t);
  for (; e && e !== Object.prototype; ) {
    if (g.hasOwnProp(e, "toJSON")) return !0;
    e = Object.getPrototypeOf(e);
  }
  return !1;
}
function Rg(t, e) {
  const l = new Set(e.map((u) => String(u).toLowerCase())),
    a = [],
    n = (u) => {
      if (u === null || typeof u != "object" || g.isBuffer(u)) return u;
      if (a.indexOf(u) !== -1) return;
      (u instanceof xt && (u = u.toJSON()), a.push(u));
      let i;
      if (g.isArray(u))
        ((i = []),
          u.forEach((c, s) => {
            const f = n(c);
            g.isUndefined(f) || (i[s] = f);
          }));
      else {
        if (!g.isPlainObject(u) && Tg(u)) return (a.pop(), u);
        i = Object.create(null);
        for (const [c, s] of Object.entries(u)) {
          const f = l.has(c.toLowerCase()) ? Og : n(s);
          g.isUndefined(f) || (i[c] = f);
        }
      }
      return (a.pop(), i);
    };
  return n(t);
}
let M = class wh extends Error {
  static from(e, l, a, n, u, i) {
    const c = new wh(e.message, l || e.code, a, n, u);
    return (
      Object.defineProperty(c, "cause", {
        __proto__: null,
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      (c.name = e.name),
      e.status != null && c.status == null && (c.status = e.status),
      i && Object.assign(c, i),
      c
    );
  }
  constructor(e, l, a, n, u) {
    (super(e),
      Object.defineProperty(this, "message", {
        __proto__: null,
        value: e,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      l && (this.code = l),
      a && (this.config = a),
      n && (this.request = n),
      u && ((this.response = u), (this.status = u.status)));
  }
  toJSON() {
    const e = this.config,
      l = e && g.hasOwnProp(e, "redact") ? e.redact : void 0,
      a = g.isArray(l) && l.length > 0 ? Rg(e, l) : g.toJSONObject(e);
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: a,
      code: this.code,
      status: this.status,
    };
  }
};
M.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
M.ERR_BAD_OPTION = "ERR_BAD_OPTION";
M.ECONNABORTED = "ECONNABORTED";
M.ETIMEDOUT = "ETIMEDOUT";
M.ECONNREFUSED = "ECONNREFUSED";
M.ERR_NETWORK = "ERR_NETWORK";
M.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
M.ERR_DEPRECATED = "ERR_DEPRECATED";
M.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
M.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
M.ERR_CANCELED = "ERR_CANCELED";
M.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
M.ERR_INVALID_URL = "ERR_INVALID_URL";
M.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const _g = null,
  Bh = 100;
function os(t) {
  return g.isPlainObject(t) || g.isArray(t);
}
function Hh(t) {
  return g.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function rc(t, e, l) {
  return t
    ? t
        .concat(e)
        .map(function (n, u) {
          return ((n = Hh(n)), !l && u ? "[" + n + "]" : n);
        })
        .join(l ? "." : "")
    : e;
}
function Dg(t) {
  return g.isArray(t) && !t.some(os);
}
const Mg = g.toFlatObject(g, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function Ri(t, e, l) {
  if (!g.isObject(t)) throw new TypeError("target must be an object");
  ((e = e || new FormData()),
    (l = g.toFlatObject(
      l,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (r, h) {
        return !g.isUndefined(h[r]);
      },
    )));
  const a = l.metaTokens,
    n = l.visitor || T,
    u = l.dots,
    i = l.indexes,
    c = l.Blob || (typeof Blob < "u" && Blob),
    s = l.maxDepth === void 0 ? Bh : l.maxDepth,
    f = c && g.isSpecCompliantForm(e),
    d = [];
  if (!g.isFunction(n)) throw new TypeError("visitor must be a function");
  function y(o) {
    if (o === null) return "";
    if (g.isDate(o)) return o.toISOString();
    if (g.isBoolean(o)) return o.toString();
    if (!f && g.isBlob(o))
      throw new M("Blob is not supported. Use a Buffer instead.");
    if (g.isArrayBuffer(o) || g.isTypedArray(o)) {
      if (f && typeof c == "function") return new c([o]);
      if (typeof Buffer < "u") return Buffer.from(o);
      throw new M(
        "Blob is not supported. Use a Buffer instead.",
        M.ERR_NOT_SUPPORT,
      );
    }
    return o;
  }
  function m(o) {
    if (o > s)
      throw new M(
        "Object is too deeply nested (" + o + " levels). Max depth: " + s,
        M.ERR_FORM_DATA_DEPTH_EXCEEDED,
      );
  }
  function p(o, r) {
    if (s === 1 / 0) return JSON.stringify(o);
    const h = [];
    return JSON.stringify(o, function (_, N) {
      if (!g.isObject(N)) return N;
      for (; h.length && h[h.length - 1] !== this; ) h.pop();
      return (h.push(N), m(r + h.length - 1), N);
    });
  }
  function T(o, r, h) {
    let b = o;
    if (g.isReactNative(e) && g.isReactNativeBlob(o))
      return (e.append(rc(h, r, u), y(o)), !1);
    if (o && !h && typeof o == "object") {
      if (g.endsWith(r, "{}")) ((r = a ? r : r.slice(0, -2)), (o = p(o, 1)));
      else if (
        (g.isArray(o) && Dg(o)) ||
        ((g.isFileList(o) || g.endsWith(r, "[]")) && (b = g.toArray(o)))
      )
        return (
          (r = Hh(r)),
          b.forEach(function (N, D) {
            !(g.isUndefined(N) || N === null) &&
              e.append(
                i === !0 ? rc([r], D, u) : i === null ? r : r + "[]",
                y(N),
              );
          }),
          !1
        );
    }
    return os(o) ? !0 : (e.append(rc(h, r, u), y(o)), !1);
  }
  const A = Object.assign(Mg, {
    defaultVisitor: T,
    convertValue: y,
    isVisitable: os,
  });
  function R(o, r, h = 0) {
    if (!g.isUndefined(o)) {
      if ((m(h), d.indexOf(o) !== -1))
        throw new Error("Circular reference detected in " + r.join("."));
      (d.push(o),
        g.forEach(o, function (_, N) {
          (!(g.isUndefined(_) || _ === null) &&
            n.call(e, _, g.isString(N) ? N.trim() : N, r, A)) === !0 &&
            R(_, r ? r.concat(N) : [N], h + 1);
        }),
        d.pop());
    }
  }
  if (!g.isObject(t)) throw new TypeError("data must be an object");
  return (R(t), e);
}
function ao(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20/g, function (a) {
    return e[a];
  });
}
function bf(t, e) {
  ((this._pairs = []), t && Ri(t, this, e));
}
const qh = bf.prototype;
qh.append = function (e, l) {
  this._pairs.push([e, l]);
};
qh.toString = function (e) {
  const l = e ? (a) => e.call(this, a, ao) : ao;
  return this._pairs
    .map(function (n) {
      return l(n[0]) + "=" + l(n[1]);
    }, "")
    .join("&");
};
function Ng(t) {
  return encodeURIComponent(t)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Lh(t, e, l) {
  if (!e) return t;
  t = t || "";
  const a = g.isFunction(l) ? { serialize: l } : l,
    n = g.getSafeProp(a, "encode") || Ng,
    u = g.getSafeProp(a, "serialize");
  let i;
  if (
    (u
      ? (i = u(e, a))
      : (i = g.isURLSearchParams(e) ? e.toString() : new bf(e, a).toString(n)),
    i)
  ) {
    const c = t.indexOf("#");
    (c !== -1 && (t = t.slice(0, c)),
      (t += (t.indexOf("?") === -1 ? "?" : "&") + i));
  }
  return t;
}
class no {
  constructor() {
    this.handlers = [];
  }
  use(e, l, a) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: l,
        synchronous: a ? a.synchronous : !1,
        runWhen: a ? a.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    g.forEach(this.handlers, function (a) {
      a !== null && e(a);
    });
  }
}
const Sf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
    advertiseZstdAcceptEncoding: !1,
    validateStatusUndefinedResolves: !0,
  },
  Cg = typeof URLSearchParams < "u" ? URLSearchParams : bf,
  zg = typeof FormData < "u" ? FormData : null,
  Ug = typeof Blob < "u" ? Blob : null,
  xg = {
    isBrowser: !0,
    classes: { URLSearchParams: Cg, FormData: zg, Blob: Ug },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Ef = typeof window < "u" && typeof document < "u",
  ds = (typeof navigator == "object" && navigator) || void 0,
  wg =
    Ef &&
    (!ds || ["ReactNative", "NativeScript", "NS"].indexOf(ds.product) < 0),
  Bg =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Hg = (Ef && window.location.href) || "http://localhost",
  qg = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Ef,
        hasStandardBrowserEnv: wg,
        hasStandardBrowserWebWorkerEnv: Bg,
        navigator: ds,
        origin: Hg,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Mt = { ...qg, ...xg };
function Lg(t, e) {
  return Ri(t, new Mt.classes.URLSearchParams(), {
    visitor: function (l, a, n, u) {
      return Mt.isNode && g.isBuffer(l)
        ? (this.append(a, l.toString("base64")), !1)
        : u.defaultVisitor.apply(this, arguments);
    },
    ...e,
  });
}
const uo = Bh;
function jh(t) {
  if (t > uo)
    throw new M(
      "FormData field is too deeply nested (" +
        t +
        " levels). Max depth: " +
        uo,
      M.ERR_FORM_DATA_DEPTH_EXCEEDED,
    );
}
function jg(t) {
  const e = [],
    l = /\w+|\[(\w*)]/g;
  let a;
  for (; (a = l.exec(t)) !== null; )
    (jh(e.length), e.push(a[0] === "[]" ? "" : a[1] || a[0]));
  return e;
}
function Yg(t) {
  const e = {},
    l = Object.keys(t);
  let a;
  const n = l.length;
  let u;
  for (a = 0; a < n; a++) ((u = l[a]), (e[u] = t[u]));
  return e;
}
function Yh(t) {
  function e(l, a, n, u) {
    jh(u);
    let i = l[u++];
    if (i === "__proto__") return !0;
    const c = Number.isFinite(+i),
      s = u >= l.length;
    return (
      (i = !i && g.isArray(n) ? n.length : i),
      s
        ? (g.hasOwnProp(n, i)
            ? (n[i] = g.isArray(n[i]) ? n[i].concat(a) : [n[i], a])
            : (n[i] = a),
          !c)
        : ((!g.hasOwnProp(n, i) || !g.isObject(n[i])) && (n[i] = []),
          e(l, a, n[i], u) && g.isArray(n[i]) && (n[i] = Yg(n[i])),
          !c)
    );
  }
  if (g.isFormData(t) && g.isFunction(t.entries)) {
    const l = {};
    return (
      g.forEachEntry(t, (a, n) => {
        e(jg(a), n, l, 0);
      }),
      l
    );
  }
  return null;
}
const Ql = (t, e) => (t != null && g.hasOwnProp(t, e) ? t[e] : void 0);
function Xg(t, e, l) {
  if (g.isString(t))
    try {
      return ((e || JSON.parse)(t), g.trim(t));
    } catch (a) {
      if (a.name !== "SyntaxError") throw a;
    }
  return (l || JSON.stringify)(t);
}
const Zn = {
  transitional: Sf,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (e, l) {
      const a = l.getContentType() || "",
        n = a.indexOf("application/json") > -1,
        u = g.isObject(e);
      if ((u && g.isHTMLForm(e) && (e = new FormData(e)), g.isFormData(e)))
        return n ? JSON.stringify(Yh(e)) : e;
      if (
        g.isArrayBuffer(e) ||
        g.isBuffer(e) ||
        g.isStream(e) ||
        g.isFile(e) ||
        g.isBlob(e) ||
        g.isReadableStream(e)
      )
        return e;
      if (g.isArrayBufferView(e)) return e.buffer;
      if (g.isURLSearchParams(e))
        return (
          l.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          e.toString()
        );
      let c;
      if (u) {
        const s = Ql(this, "formSerializer");
        if (a.indexOf("application/x-www-form-urlencoded") > -1)
          return Lg(e, s).toString();
        if ((c = g.isFileList(e)) || a.indexOf("multipart/form-data") > -1) {
          const f = Ql(this, "env"),
            d = f && f.FormData;
          return Ri(c ? { "files[]": e } : e, d && new d(), s);
        }
      }
      return u || n ? (l.setContentType("application/json", !1), Xg(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      const l = Ql(this, "transitional") || Zn.transitional,
        a = l && l.forcedJSONParsing,
        n = Ql(this, "responseType"),
        u = n === "json";
      if (g.isResponse(e) || g.isReadableStream(e)) return e;
      if (e && g.isString(e) && ((a && !n) || u)) {
        const c = !(l && l.silentJSONParsing) && u;
        try {
          return JSON.parse(e, Ql(this, "parseReviver"));
        } catch (s) {
          if (c)
            throw s.name === "SyntaxError"
              ? M.from(s, M.ERR_BAD_RESPONSE, this, null, Ql(this, "response"))
              : s;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Mt.classes.FormData, Blob: Mt.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
g.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (t) => {
  Zn.headers[t] = {};
});
function oc(t, e) {
  const l = this || Zn,
    a = e || l,
    n = xt.from(a.headers);
  let u = a.data;
  return (
    g.forEach(t, function (c) {
      u = c.call(l, u, n.normalize(), e ? e.status : void 0);
    }),
    n.normalize(),
    u
  );
}
function Xh(t) {
  return !!(t && t.__CANCEL__);
}
let Kn = class extends M {
  constructor(e, l, a) {
    (super(e ?? "canceled", M.ERR_CANCELED, l, a),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function Gh(t, e, l) {
  const a = l.config.validateStatus;
  !l.status || !a || a(l.status)
    ? t(l)
    : e(
        new M(
          "Request failed with status code " + l.status,
          l.status >= 400 && l.status < 500
            ? M.ERR_BAD_REQUEST
            : M.ERR_BAD_RESPONSE,
          l.config,
          l.request,
          l,
        ),
      );
}
function Gg(t) {
  const e = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t);
  return (e && e[1]) || "";
}
function Qg(t, e) {
  t = t || 10;
  const l = new Array(t),
    a = new Array(t);
  let n = 0,
    u = 0,
    i;
  return (
    (e = e !== void 0 ? e : 1e3),
    function (s) {
      const f = Date.now(),
        d = a[u];
      (i || (i = f), (l[n] = s), (a[n] = f));
      let y = u,
        m = 0;
      for (; y !== n; ) ((m += l[y++]), (y = y % t));
      if (((n = (n + 1) % t), n === u && (u = (u + 1) % t), f - i < e)) return;
      const p = d && f - d;
      return p ? Math.round((m * 1e3) / p) : void 0;
    }
  );
}
function Vg(t, e) {
  let l = 0,
    a = 1e3 / e,
    n,
    u;
  const i = (f, d = Date.now()) => {
    ((l = d), (n = null), u && (clearTimeout(u), (u = null)), t(...f));
  };
  return [
    (...f) => {
      const d = Date.now(),
        y = d - l;
      y >= a
        ? i(f, d)
        : ((n = f),
          u ||
            (u = setTimeout(() => {
              ((u = null), i(n));
            }, a - y)));
    },
    () => n && i(n),
  ];
}
const ni = (t, e, l = 3) => {
    let a = 0;
    const n = Qg(50, 250);
    return Vg((u) => {
      if (!u || typeof u.loaded != "number") return;
      const i = u.loaded,
        c = u.lengthComputable ? u.total : void 0,
        s = c != null ? Math.min(i, c) : i,
        f = Math.max(0, s - a),
        d = n(f);
      a = Math.max(a, s);
      const y = {
        loaded: s,
        total: c,
        progress: c ? s / c : void 0,
        bytes: f,
        rate: d || void 0,
        estimated: d && c ? (c - s) / d : void 0,
        event: u,
        lengthComputable: c != null,
        [e ? "download" : "upload"]: !0,
      };
      t(y);
    }, l);
  },
  io = (t, e) => {
    const l = t != null;
    return [(a) => e[0]({ lengthComputable: l, total: t, loaded: a }), e[1]];
  },
  co =
    (t) =>
    (...e) =>
      g.asap(() => t(...e)),
  kg = Mt.hasStandardBrowserEnv
    ? ((t, e) => (l) => (
        (l = new URL(l, Mt.origin)),
        t.protocol === l.protocol &&
          t.host === l.host &&
          (e || t.port === l.port)
      ))(
        new URL(Mt.origin),
        Mt.navigator && /(msie|trident)/i.test(Mt.navigator.userAgent),
      )
    : () => !0,
  Zg = Mt.hasStandardBrowserEnv
    ? {
        write(t, e, l, a, n, u, i) {
          if (typeof document > "u") return;
          const c = [`${t}=${encodeURIComponent(e)}`];
          (g.isNumber(l) && c.push(`expires=${new Date(l).toUTCString()}`),
            g.isString(a) && c.push(`path=${a}`),
            g.isString(n) && c.push(`domain=${n}`),
            u === !0 && c.push("secure"),
            g.isString(i) && c.push(`SameSite=${i}`),
            (document.cookie = c.join("; ")));
        },
        read(t) {
          if (typeof document > "u") return null;
          const e = document.cookie.split(";");
          for (let l = 0; l < e.length; l++) {
            const a = e[l].replace(/^\s+/, ""),
              n = a.indexOf("=");
            if (n !== -1 && a.slice(0, n) === t)
              try {
                return decodeURIComponent(a.slice(n + 1));
              } catch {
                return a.slice(n + 1);
              }
          }
          return null;
        },
        remove(t) {
          this.write(t, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Kg(t) {
  return typeof t != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Jg(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
const $g = /^https?:(?!\/\/)/i,
  Fg = /[\t\n\r]/g;
function Wg(t) {
  let e = 0;
  for (; e < t.length && t.charCodeAt(e) <= 32; ) e++;
  return t.slice(e);
}
function Pg(t) {
  return Wg(t).replace(Fg, "");
}
function so(t, e) {
  if (typeof t == "string" && $g.test(Pg(t)))
    throw new M(
      'Invalid URL: missing "//" after protocol',
      M.ERR_INVALID_URL,
      e,
    );
}
function Qh(t, e, l, a) {
  so(e, a);
  let n = !Kg(e);
  return t && (n || l === !1) ? (so(t, a), Jg(t, e)) : e;
}
const fo = (t) => (t instanceof xt ? { ...t } : t);
function Hl(t, e) {
  ((t = t || {}), (e = e || {}));
  const l = Object.create(null);
  Object.defineProperty(l, "hasOwnProperty", {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  });
  function a(d, y, m, p) {
    return g.isPlainObject(d) && g.isPlainObject(y)
      ? g.merge.call({ caseless: p }, d, y)
      : g.isPlainObject(y)
        ? g.merge({}, y)
        : g.isArray(y)
          ? y.slice()
          : y;
  }
  function n(d, y, m, p) {
    if (g.isUndefined(y)) {
      if (!g.isUndefined(d)) return a(void 0, d, m, p);
    } else return a(d, y, m, p);
  }
  function u(d, y) {
    if (!g.isUndefined(y)) return a(void 0, y);
  }
  function i(d, y) {
    if (g.isUndefined(y)) {
      if (!g.isUndefined(d)) return a(void 0, d);
    } else return a(void 0, y);
  }
  function c(d) {
    const y = g.hasOwnProp(e, "transitional") ? e.transitional : void 0;
    if (!g.isUndefined(y))
      if (g.isPlainObject(y)) {
        if (g.hasOwnProp(y, d)) return y[d];
      } else return;
    const m = g.hasOwnProp(t, "transitional") ? t.transitional : void 0;
    if (g.isPlainObject(m) && g.hasOwnProp(m, d)) return m[d];
  }
  function s(d, y, m) {
    if (g.hasOwnProp(e, m)) return a(d, y);
    if (g.hasOwnProp(t, m)) return a(void 0, d);
  }
  const f = {
    url: u,
    method: u,
    data: u,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    allowedSocketPaths: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (d, y, m) => n(fo(d), fo(y), m, !0),
  };
  return (
    g.forEach(Object.keys({ ...t, ...e }), function (y) {
      if (y === "__proto__" || y === "constructor" || y === "prototype") return;
      const m = g.hasOwnProp(f, y) ? f[y] : n,
        p = g.hasOwnProp(t, y) ? t[y] : void 0,
        T = g.hasOwnProp(e, y) ? e[y] : void 0,
        A = m(p, T, y);
      (g.isUndefined(A) && m !== s) || (l[y] = A);
    }),
    g.hasOwnProp(e, "validateStatus") &&
      g.isUndefined(e.validateStatus) &&
      c("validateStatusUndefinedResolves") === !1 &&
      (g.hasOwnProp(t, "validateStatus")
        ? (l.validateStatus = a(void 0, t.validateStatus))
        : delete l.validateStatus),
    l
  );
}
const Ig = ["content-type", "content-length"];
function tv(t, e, l) {
  if (l !== "content-only") {
    t.set(e);
    return;
  }
  Object.entries(e || {}).forEach(([a, n]) => {
    Ig.includes(a.toLowerCase()) && t.set(a, n);
  });
}
const ev = (t) =>
  encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi, (e, l) =>
    String.fromCharCode(parseInt(l, 16)),
  );
function Vh(t) {
  const e = Hl({}, t),
    l = (m) => (g.hasOwnProp(e, m) ? e[m] : void 0),
    a = l("data");
  let n = l("withXSRFToken");
  const u = l("xsrfHeaderName"),
    i = l("xsrfCookieName");
  let c = l("headers");
  const s = l("auth"),
    f = l("baseURL"),
    d = l("allowAbsoluteUrls"),
    y = l("url");
  if (
    ((e.headers = c = xt.from(c)),
    (e.url = Lh(Qh(f, y, d, e), l("params"), l("paramsSerializer"))),
    s)
  ) {
    const m = g.getSafeProp(s, "username") || "",
      p = g.getSafeProp(s, "password") || "";
    try {
      c.set("Authorization", "Basic " + btoa(m + ":" + (p ? ev(p) : "")));
    } catch (T) {
      throw M.from(T, M.ERR_BAD_OPTION_VALUE, t);
    }
  }
  if (
    (g.isFormData(a) &&
      (Mt.hasStandardBrowserEnv ||
      Mt.hasStandardBrowserWebWorkerEnv ||
      g.isReactNative(a)
        ? c.setContentType(void 0)
        : g.isFunction(a.getHeaders) &&
          tv(c, a.getHeaders(), l("formDataHeaderPolicy"))),
    Mt.hasStandardBrowserEnv &&
      (g.isFunction(n) && (n = n(e)), n === !0 || (n == null && kg(e.url))))
  ) {
    const p = u && i && Zg.read(i);
    p && c.set(u, p);
  }
  return e;
}
const lv = typeof XMLHttpRequest < "u",
  av =
    lv &&
    function (t) {
      return new Promise(function (l, a) {
        const n = Vh(t);
        let u = n.data;
        const i = xt.from(n.headers).normalize();
        let { responseType: c, onUploadProgress: s, onDownloadProgress: f } = n,
          d,
          y,
          m,
          p,
          T;
        function A() {
          (p && p(),
            T && T(),
            n.cancelToken && n.cancelToken.unsubscribe(d),
            n.signal && n.signal.removeEventListener("abort", d));
        }
        let R = new XMLHttpRequest();
        (R.open(n.method.toUpperCase(), n.url, !0), (R.timeout = n.timeout));
        function o() {
          if (!R) return;
          const h = xt.from(
              "getAllResponseHeaders" in R && R.getAllResponseHeaders(),
            ),
            _ = {
              data:
                !c || c === "text" || c === "json"
                  ? R.responseText
                  : R.response,
              status: R.status,
              statusText: R.statusText,
              headers: h,
              config: t,
              request: R,
            };
          (Gh(
            function (D) {
              (l(D), A());
            },
            function (D) {
              (a(D), A());
            },
            _,
          ),
            (R = null));
        }
        ("onloadend" in R
          ? (R.onloadend = o)
          : (R.onreadystatechange = function () {
              !R ||
                R.readyState !== 4 ||
                (R.status === 0 &&
                  !(R.responseURL && R.responseURL.startsWith("file:"))) ||
                setTimeout(o);
            }),
          (R.onabort = function () {
            R &&
              (a(new M("Request aborted", M.ECONNABORTED, t, R)),
              A(),
              (R = null));
          }),
          (R.onerror = function (b) {
            const _ = b && b.message ? b.message : "Network Error",
              N = new M(_, M.ERR_NETWORK, t, R);
            ((N.event = b || null), a(N), A(), (R = null));
          }),
          (R.ontimeout = function () {
            let b = n.timeout
              ? "timeout of " + n.timeout + "ms exceeded"
              : "timeout exceeded";
            const _ = n.transitional || Sf;
            (n.timeoutErrorMessage && (b = n.timeoutErrorMessage),
              a(
                new M(
                  b,
                  _.clarifyTimeoutError ? M.ETIMEDOUT : M.ECONNABORTED,
                  t,
                  R,
                ),
              ),
              A(),
              (R = null));
          }),
          u === void 0 && i.setContentType(null),
          "setRequestHeader" in R &&
            g.forEach(xh(i), function (b, _) {
              R.setRequestHeader(_, b);
            }),
          g.isUndefined(n.withCredentials) ||
            (R.withCredentials = !!n.withCredentials),
          c && c !== "json" && (R.responseType = n.responseType),
          f && (([m, T] = ni(f, !0)), R.addEventListener("progress", m)),
          s &&
            R.upload &&
            (([y, p] = ni(s)),
            R.upload.addEventListener("progress", y),
            R.upload.addEventListener("loadend", p)),
          (n.cancelToken || n.signal) &&
            ((d = (h) => {
              R &&
                (a(!h || h.type ? new Kn(null, t, R) : h),
                R.abort(),
                A(),
                (R = null));
            }),
            n.cancelToken && n.cancelToken.subscribe(d),
            n.signal &&
              (n.signal.aborted
                ? d()
                : n.signal.addEventListener("abort", d))));
        const r = Gg(n.url);
        if (r && !Mt.protocols.includes(r)) {
          (a(new M("Unsupported protocol " + r + ":", M.ERR_BAD_REQUEST, t)),
            A());
          return;
        }
        R.send(u || null);
      });
    },
  nv = (t, e) => {
    if (((t = t ? t.filter(Boolean) : []), !e && !t.length)) return;
    const l = new AbortController();
    let a = !1;
    const n = function (s) {
      if (!a) {
        ((a = !0), i());
        const f = s instanceof Error ? s : this.reason;
        l.abort(
          f instanceof M ? f : new Kn(f instanceof Error ? f.message : f),
        );
      }
    };
    let u =
      e &&
      setTimeout(() => {
        ((u = null), n(new M(`timeout of ${e}ms exceeded`, M.ETIMEDOUT)));
      }, e);
    const i = () => {
      t &&
        (u && clearTimeout(u),
        (u = null),
        t.forEach((s) => {
          s.unsubscribe ? s.unsubscribe(n) : s.removeEventListener("abort", n);
        }),
        (t = null));
    };
    t.forEach((s) => s.addEventListener("abort", n, { once: !0 }));
    const { signal: c } = l;
    return ((c.unsubscribe = () => g.asap(i)), c);
  },
  uv = function* (t, e) {
    let l = t.byteLength;
    if (l < e) {
      yield t;
      return;
    }
    let a = 0,
      n;
    for (; a < l; ) ((n = a + e), yield t.slice(a, n), (a = n));
  },
  iv = async function* (t, e) {
    for await (const l of cv(t)) yield* uv(l, e);
  },
  cv = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t;
      return;
    }
    const e = t.getReader();
    try {
      for (;;) {
        const { done: l, value: a } = await e.read();
        if (l) break;
        yield a;
      }
    } finally {
      await e.cancel();
    }
  },
  ro = (t, e, l, a) => {
    const n = iv(t, e);
    let u = 0,
      i,
      c = (s) => {
        i || ((i = !0), a && a(s));
      };
    return new ReadableStream(
      {
        async pull(s) {
          try {
            const { done: f, value: d } = await n.next();
            if (f) {
              (c(), s.close());
              return;
            }
            let y = d.byteLength;
            if (l) {
              let m = (u += y);
              l(m);
            }
            s.enqueue(new Uint8Array(d));
          } catch (f) {
            throw (c(f), f);
          }
        },
        cancel(s) {
          return (c(s), n.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  ui = (t) =>
    (t >= 48 && t <= 57) || (t >= 65 && t <= 70) || (t >= 97 && t <= 102),
  sv = (t, e, l) =>
    e + 2 < l && ui(t.charCodeAt(e + 1)) && ui(t.charCodeAt(e + 2));
function fv(t) {
  if (!t || typeof t != "string" || !t.startsWith("data:")) return 0;
  const e = t.indexOf(",");
  if (e < 0) return 0;
  const l = t.slice(5, e),
    a = t.slice(e + 1);
  if (/;base64/i.test(l)) {
    let i = a.length;
    const c = a.length;
    for (let p = 0; p < c; p++)
      if (a.charCodeAt(p) === 37 && p + 2 < c) {
        const T = a.charCodeAt(p + 1),
          A = a.charCodeAt(p + 2);
        ui(T) && ui(A) && ((i -= 2), (p += 2));
      }
    let s = 0,
      f = c - 1;
    const d = (p) =>
      p >= 2 &&
      a.charCodeAt(p - 2) === 37 &&
      a.charCodeAt(p - 1) === 51 &&
      (a.charCodeAt(p) === 68 || a.charCodeAt(p) === 100);
    (f >= 0 && (a.charCodeAt(f) === 61 ? (s++, f--) : d(f) && (s++, (f -= 3))),
      s === 1 && f >= 0 && (a.charCodeAt(f) === 61 || d(f)) && s++);
    const m = Math.floor(i / 4) * 3 - (s || 0);
    return m > 0 ? m : 0;
  }
  let u = 0;
  for (let i = 0, c = a.length; i < c; i++) {
    const s = a.charCodeAt(i);
    if (s === 37 && sv(a, i, c)) ((u += 1), (i += 2));
    else if (s < 128) u += 1;
    else if (s < 2048) u += 2;
    else if (s >= 55296 && s <= 56319 && i + 1 < c) {
      const f = a.charCodeAt(i + 1);
      f >= 56320 && f <= 57343 ? ((u += 4), i++) : (u += 3);
    } else u += 3;
  }
  return u;
}
const Af = "1.18.1",
  oo = 64 * 1024,
  { isFunction: ru } = g,
  rv = (t) =>
    encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi, (e, l) =>
      String.fromCharCode(parseInt(l, 16)),
    ),
  mo = (t) => {
    if (!g.isString(t)) return t;
    try {
      return decodeURIComponent(t);
    } catch {
      return t;
    }
  },
  ho = (t, ...e) => {
    try {
      return !!t(...e);
    } catch {
      return !1;
    }
  },
  ov = (t) => {
    const e = t.indexOf("://");
    let l = t;
    return (
      e !== -1 && (l = l.slice(e + 3)),
      l.includes("@") || l.includes(":")
    );
  },
  dv = (t) => {
    const e = g.global !== void 0 && g.global !== null ? g.global : globalThis,
      { ReadableStream: l, TextEncoder: a } = e;
    t = g.merge.call(
      { skipUndefined: !0 },
      { Request: e.Request, Response: e.Response },
      t,
    );
    const { fetch: n, Request: u, Response: i } = t,
      c = n ? ru(n) : typeof fetch == "function",
      s = ru(u),
      f = ru(i);
    if (!c) return !1;
    const d = c && ru(l),
      y =
        c &&
        (typeof a == "function"
          ? (
              (o) => (r) =>
                o.encode(r)
            )(new a())
          : async (o) => new Uint8Array(await new u(o).arrayBuffer())),
      m =
        s &&
        d &&
        ho(() => {
          let o = !1;
          const r = new u(Mt.origin, {
              body: new l(),
              method: "POST",
              get duplex() {
                return ((o = !0), "half");
              },
            }),
            h = r.headers.has("Content-Type");
          return (r.body != null && r.body.cancel(), o && !h);
        }),
      p = f && d && ho(() => g.isReadableStream(new i("").body)),
      T = { stream: p && ((o) => o.body) };
    c &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((o) => {
        !T[o] &&
          (T[o] = (r, h) => {
            let b = r && r[o];
            if (b) return b.call(r);
            throw new M(
              `Response type '${o}' is not supported`,
              M.ERR_NOT_SUPPORT,
              h,
            );
          });
      });
    const A = async (o) => {
        if (o == null) return 0;
        if (g.isBlob(o)) return o.size;
        if (g.isSpecCompliantForm(o))
          return (
            await new u(Mt.origin, { method: "POST", body: o }).arrayBuffer()
          ).byteLength;
        if (g.isArrayBufferView(o) || g.isArrayBuffer(o)) return o.byteLength;
        if ((g.isURLSearchParams(o) && (o = o + ""), g.isString(o)))
          return (await y(o)).byteLength;
      },
      R = async (o, r) => {
        const h = g.toFiniteNumber(o.getContentLength());
        return h ?? A(r);
      };
    return async (o) => {
      let {
        url: r,
        method: h,
        data: b,
        signal: _,
        cancelToken: N,
        timeout: D,
        onDownloadProgress: z,
        onUploadProgress: X,
        responseType: w,
        headers: tt,
        withCredentials: St = "same-origin",
        fetchOptions: Oe,
        maxContentLength: Et,
        maxBodyLength: qt,
      } = Vh(o);
      const S = g.isNumber(Et) && Et > -1,
        C = g.isNumber(qt) && qt > -1,
        U = (W) => (g.hasOwnProp(o, W) ? o[W] : void 0);
      let H = n || fetch;
      w = w ? (w + "").toLowerCase() : "text";
      let O = nv([_, N && N.toAbortSignal()], D),
        x = null;
      const k =
        O &&
        O.unsubscribe &&
        (() => {
          O.unsubscribe();
        });
      let st,
        ot = null;
      const yl = () =>
        new M(
          "Request body larger than maxBodyLength limit",
          M.ERR_BAD_REQUEST,
          o,
          x,
        );
      try {
        let W;
        const ee = U("auth");
        if (ee) {
          const q = g.getSafeProp(ee, "username") || "",
            Vt = g.getSafeProp(ee, "password") || "";
          W = { username: q, password: Vt };
        }
        if (ov(r)) {
          const q = new URL(r, Mt.origin);
          if (!W && (q.username || q.password)) {
            const Vt = mo(q.username),
              Ge = mo(q.password);
            W = { username: Vt, password: Ge };
          }
          (q.username || q.password) &&
            ((q.username = ""), (q.password = ""), (r = q.href));
        }
        if (
          (W &&
            (tt.delete("authorization"),
            tt.set(
              "Authorization",
              "Basic " +
                btoa(rv((W.username || "") + ":" + (W.password || ""))),
            )),
          S && typeof r == "string" && r.startsWith("data:") && fv(r) > Et)
        )
          throw new M(
            "maxContentLength size of " + Et + " exceeded",
            M.ERR_BAD_RESPONSE,
            o,
            x,
          );
        if (C && h !== "get" && h !== "head") {
          const q = await A(b);
          if (typeof q == "number" && isFinite(q) && ((st = q), q > qt))
            throw yl();
        }
        const Jn = C && (g.isReadableStream(b) || g.isStream(b)),
          Tf = (q, Vt, Ge) =>
            ro(
              q,
              oo,
              (pl) => {
                if (C && pl > qt) throw (ot = yl());
                Vt && Vt(pl);
              },
              Ge,
            );
        if (m && h !== "get" && h !== "head" && (X || Jn)) {
          if (((st = st ?? (await R(tt, b))), st !== 0 || Jn)) {
            let q = new u(r, { method: "POST", body: b, duplex: "half" }),
              Vt;
            if (
              (g.isFormData(b) &&
                (Vt = q.headers.get("content-type")) &&
                tt.setContentType(Vt),
              q.body)
            ) {
              const [Ge, pl] = (X && io(st, ni(co(X)))) || [];
              b = Tf(q.body, Ge, pl);
            }
          }
        } else if (Jn && !s && d && h !== "get" && h !== "head") b = Tf(b);
        else if (Jn && s && !m && h !== "get" && h !== "head")
          throw new M(
            "Stream request bodies are not supported by the current fetch implementation",
            M.ERR_NOT_SUPPORT,
            o,
            x,
          );
        g.isString(St) || (St = St ? "include" : "omit");
        const Wh = s && "credentials" in u.prototype;
        if (g.isFormData(b)) {
          const q = tt.getContentType();
          q &&
            /^multipart\/form-data/i.test(q) &&
            !/boundary=/i.test(q) &&
            tt.delete("content-type");
        }
        tt.set("User-Agent", "axios/" + Af, !1);
        const Rf = {
          ...Oe,
          signal: O,
          method: h.toUpperCase(),
          headers: xh(tt.normalize()),
          body: b,
          duplex: "half",
          credentials: Wh ? St : void 0,
        };
        x = s && new u(r, Rf);
        let Te = await (s ? H(x, Oe) : H(r, Rf));
        const _f = xt.from(Te.headers);
        if (S) {
          const q = g.toFiniteNumber(_f.getContentLength());
          if (q != null && q > Et)
            throw new M(
              "maxContentLength size of " + Et + " exceeded",
              M.ERR_BAD_RESPONSE,
              o,
              x,
            );
        }
        const Di = p && (w === "stream" || w === "response");
        if (p && Te.body && (z || S || (Di && k))) {
          const q = {};
          ["status", "statusText", "headers"].forEach((Ha) => {
            q[Ha] = Te[Ha];
          });
          const Vt = g.toFiniteNumber(_f.getContentLength()),
            [Ge, pl] = (z && io(Vt, ni(co(z), !0))) || [];
          let Df = 0;
          const Ph = (Ha) => {
            if (S && ((Df = Ha), Df > Et))
              throw new M(
                "maxContentLength size of " + Et + " exceeded",
                M.ERR_BAD_RESPONSE,
                o,
                x,
              );
            Ge && Ge(Ha);
          };
          Te = new i(
            ro(Te.body, oo, Ph, () => {
              (pl && pl(), k && k());
            }),
            q,
          );
        }
        w = w || "text";
        let Re = await T[g.findKey(T, w) || "text"](Te, o);
        if (S && !p && !Di) {
          let q;
          if (
            (Re != null &&
              (typeof Re.byteLength == "number"
                ? (q = Re.byteLength)
                : typeof Re.size == "number"
                  ? (q = Re.size)
                  : typeof Re == "string" &&
                    (q =
                      typeof a == "function"
                        ? new a().encode(Re).byteLength
                        : Re.length)),
            typeof q == "number" && q > Et)
          )
            throw new M(
              "maxContentLength size of " + Et + " exceeded",
              M.ERR_BAD_RESPONSE,
              o,
              x,
            );
        }
        return (
          !Di && k && k(),
          await new Promise((q, Vt) => {
            Gh(q, Vt, {
              data: Re,
              headers: xt.from(Te.headers),
              status: Te.status,
              statusText: Te.statusText,
              config: o,
              request: x,
            });
          })
        );
      } catch (W) {
        if ((k && k(), O && O.aborted && O.reason instanceof M)) {
          const ee = O.reason;
          throw (
            (ee.config = o),
            x && (ee.request = x),
            W !== ee &&
              Object.defineProperty(ee, "cause", {
                __proto__: null,
                value: W,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
            ee
          );
        }
        if (ot) throw (x && !ot.request && (ot.request = x), ot);
        if (W instanceof M) throw (x && !W.request && (W.request = x), W);
        if (
          W &&
          W.name === "TypeError" &&
          /Load failed|fetch/i.test(W.message)
        ) {
          const ee = new M(
            "Network Error",
            M.ERR_NETWORK,
            o,
            x,
            W && W.response,
          );
          throw (
            Object.defineProperty(ee, "cause", {
              __proto__: null,
              value: W.cause || W,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            ee
          );
        }
        throw M.from(W, W && W.code, o, x, W && W.response);
      }
    };
  },
  mv = new Map(),
  kh = (t) => {
    let e = (t && t.env) || {};
    const { fetch: l, Request: a, Response: n } = e,
      u = [a, n, l];
    let i = u.length,
      c = i,
      s,
      f,
      d = mv;
    for (; c--; )
      ((s = u[c]),
        (f = d.get(s)),
        f === void 0 && d.set(s, (f = c ? new Map() : dv(e))),
        (d = f));
    return f;
  };
kh();
const Of = { http: _g, xhr: av, fetch: { get: kh } };
g.forEach(Of, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { __proto__: null, value: e });
    } catch {}
    Object.defineProperty(t, "adapterName", { __proto__: null, value: e });
  }
});
const yo = (t) => `- ${t}`,
  hv = (t) => g.isFunction(t) || t === null || t === !1;
function yv(t, e) {
  t = g.isArray(t) ? t : [t];
  const { length: l } = t;
  let a, n;
  const u = {};
  for (let i = 0; i < l; i++) {
    a = t[i];
    let c;
    if (
      ((n = a),
      !hv(a) && ((n = Of[(c = String(a)).toLowerCase()]), n === void 0))
    )
      throw new M(`Unknown adapter '${c}'`);
    if (n && (g.isFunction(n) || (n = n.get(e)))) break;
    u[c || "#" + i] = n;
  }
  if (!n) {
    const i = Object.entries(u).map(
      ([s, f]) =>
        `adapter ${s} ` +
        (f === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let c = l
      ? i.length > 1
        ? `since :
` +
          i.map(yo).join(`
`)
        : " " + yo(i[0])
      : "as no adapter specified";
    throw new M(
      "There is no suitable adapter to dispatch the request " + c,
      M.ERR_NOT_SUPPORT,
    );
  }
  return n;
}
const Zh = { getAdapter: yv, adapters: Of };
function dc(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new Kn(null, t);
}
function po(t) {
  return (
    dc(t),
    (t.headers = xt.from(t.headers)),
    (t.data = oc.call(t, t.transformRequest)),
    ["post", "put", "patch"].indexOf(t.method) !== -1 &&
      t.headers.setContentType("application/x-www-form-urlencoded", !1),
    Zh.getAdapter(
      t.adapter || Zn.adapter,
      t,
    )(t).then(
      function (a) {
        (dc(t), (t.response = a));
        try {
          a.data = oc.call(t, t.transformResponse, a);
        } finally {
          delete t.response;
        }
        return ((a.headers = xt.from(a.headers)), a);
      },
      function (a) {
        if (!Xh(a) && (dc(t), a && a.response)) {
          t.response = a.response;
          try {
            a.response.data = oc.call(t, t.transformResponse, a.response);
          } finally {
            delete t.response;
          }
          a.response.headers = xt.from(a.response.headers);
        }
        return Promise.reject(a);
      },
    )
  );
}
const _i = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (t, e) => {
    _i[t] = function (a) {
      return typeof a === t || "a" + (e < 1 ? "n " : " ") + t;
    };
  },
);
const go = {};
_i.transitional = function (e, l, a) {
  function n(u, i) {
    return (
      "[Axios v" +
      Af +
      "] Transitional option '" +
      u +
      "'" +
      i +
      (a ? ". " + a : "")
    );
  }
  return (u, i, c) => {
    if (e === !1)
      throw new M(
        n(i, " has been removed" + (l ? " in " + l : "")),
        M.ERR_DEPRECATED,
      );
    return (
      l &&
        !go[i] &&
        ((go[i] = !0),
        console.warn(
          n(
            i,
            " has been deprecated since v" +
              l +
              " and will be removed in the near future",
          ),
        )),
      e ? e(u, i, c) : !0
    );
  };
};
_i.spelling = function (e) {
  return (l, a) => (console.warn(`${a} is likely a misspelling of ${e}`), !0);
};
function pv(t, e, l) {
  if (typeof t != "object" || t === null)
    throw new M("options must be an object", M.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(t);
  let n = a.length;
  for (; n-- > 0; ) {
    const u = a[n],
      i = Object.prototype.hasOwnProperty.call(e, u) ? e[u] : void 0;
    if (i) {
      const c = t[u],
        s = c === void 0 || i(c, u, t);
      if (s !== !0)
        throw new M("option " + u + " must be " + s, M.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (l !== !0) throw new M("Unknown option " + u, M.ERR_BAD_OPTION);
  }
}
const _u = { assertOptions: pv, validators: _i },
  Ct = _u.validators;
let Cl = class {
  constructor(e) {
    ((this.defaults = e || {}),
      (this.interceptors = { request: new no(), response: new no() }));
  }
  async request(e, l) {
    try {
      return await this._request(e, l);
    } catch (a) {
      if (a instanceof Error) {
        let n = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(n)
          : (n = new Error());
        const u = (() => {
          if (!n.stack) return "";
          const i = n.stack.indexOf(`
`);
          return i === -1 ? "" : n.stack.slice(i + 1);
        })();
        try {
          if (!a.stack) a.stack = u;
          else if (u) {
            const i = u.indexOf(`
`),
              c =
                i === -1
                  ? -1
                  : u.indexOf(
                      `
`,
                      i + 1,
                    ),
              s = c === -1 ? "" : u.slice(c + 1);
            String(a.stack).endsWith(s) ||
              (a.stack +=
                `
` + u);
          }
        } catch {}
      }
      throw a;
    }
  }
  _request(e, l) {
    (typeof e == "string" ? ((l = l || {}), (l.url = e)) : (l = e || {}),
      (l = Hl(this.defaults, l)));
    const { transitional: a, paramsSerializer: n, headers: u } = l;
    (a !== void 0 &&
      _u.assertOptions(
        a,
        {
          silentJSONParsing: Ct.transitional(Ct.boolean),
          forcedJSONParsing: Ct.transitional(Ct.boolean),
          clarifyTimeoutError: Ct.transitional(Ct.boolean),
          legacyInterceptorReqResOrdering: Ct.transitional(Ct.boolean),
          advertiseZstdAcceptEncoding: Ct.transitional(Ct.boolean),
          validateStatusUndefinedResolves: Ct.transitional(Ct.boolean),
        },
        !1,
      ),
      n != null &&
        (g.isFunction(n)
          ? (l.paramsSerializer = { serialize: n })
          : _u.assertOptions(
              n,
              { encode: Ct.function, serialize: Ct.function },
              !0,
            )),
      l.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (l.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (l.allowAbsoluteUrls = !0)),
      _u.assertOptions(
        l,
        {
          baseUrl: Ct.spelling("baseURL"),
          withXsrfToken: Ct.spelling("withXSRFToken"),
        },
        !0,
      ),
      (l.method = (l.method || this.defaults.method || "get").toLowerCase()));
    let i = u && g.merge(u.common, u[l.method]);
    (u &&
      g.forEach(
        ["delete", "get", "head", "post", "put", "patch", "query", "common"],
        (T) => {
          delete u[T];
        },
      ),
      (l.headers = xt.concat(i, u)));
    const c = [];
    let s = !0;
    this.interceptors.request.forEach(function (A) {
      if (typeof A.runWhen == "function" && A.runWhen(l) === !1) return;
      s = s && A.synchronous;
      const R = l.transitional || Sf;
      R && R.legacyInterceptorReqResOrdering
        ? c.unshift(A.fulfilled, A.rejected)
        : c.push(A.fulfilled, A.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function (A) {
      f.push(A.fulfilled, A.rejected);
    });
    let d,
      y = 0,
      m;
    if (!s) {
      const T = [po.bind(this), void 0];
      for (
        T.unshift(...c), T.push(...f), m = T.length, d = Promise.resolve(l);
        y < m;
      )
        d = d.then(T[y++], T[y++]);
      return d;
    }
    m = c.length;
    let p = l;
    for (; y < m; ) {
      const T = c[y++],
        A = c[y++];
      try {
        p = T(p);
      } catch (R) {
        A.call(this, R);
        break;
      }
    }
    try {
      d = po.call(this, p);
    } catch (T) {
      return Promise.reject(T);
    }
    for (y = 0, m = f.length; y < m; ) d = d.then(f[y++], f[y++]);
    return d;
  }
  getUri(e) {
    e = Hl(this.defaults, e);
    const l = Qh(e.baseURL, e.url, e.allowAbsoluteUrls, e);
    return Lh(l, e.params, e.paramsSerializer);
  }
};
g.forEach(["delete", "get", "head", "options"], function (e) {
  Cl.prototype[e] = function (l, a) {
    return this.request(
      Hl(a || {}, {
        method: e,
        url: l,
        data: a && g.hasOwnProp(a, "data") ? a.data : void 0,
      }),
    );
  };
});
g.forEach(["post", "put", "patch", "query"], function (e) {
  function l(a) {
    return function (u, i, c) {
      return this.request(
        Hl(c || {}, {
          method: e,
          headers: a ? { "Content-Type": "multipart/form-data" } : {},
          url: u,
          data: i,
        }),
      );
    };
  }
  ((Cl.prototype[e] = l()),
    e !== "query" && (Cl.prototype[e + "Form"] = l(!0)));
});
let gv = class Kh {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let l;
    this.promise = new Promise(function (u) {
      l = u;
    });
    const a = this;
    (this.promise.then((n) => {
      if (!a._listeners) return;
      let u = a._listeners.length;
      for (; u-- > 0; ) a._listeners[u](n);
      a._listeners = null;
    }),
      (this.promise.then = (n) => {
        let u;
        const i = new Promise((c) => {
          (a.subscribe(c), (u = c));
        }).then(n);
        return (
          (i.cancel = function () {
            a.unsubscribe(u);
          }),
          i
        );
      }),
      e(function (u, i, c) {
        a.reason || ((a.reason = new Kn(u, i, c)), l(a.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const l = this._listeners.indexOf(e);
    l !== -1 && this._listeners.splice(l, 1);
  }
  toAbortSignal() {
    const e = new AbortController(),
      l = (a) => {
        e.abort(a);
      };
    return (
      this.subscribe(l),
      (e.signal.unsubscribe = () => this.unsubscribe(l)),
      e.signal
    );
  }
  static source() {
    let e;
    return {
      token: new Kh(function (n) {
        e = n;
      }),
      cancel: e,
    };
  }
};
function vv(t) {
  return function (l) {
    return t.apply(null, l);
  };
}
function bv(t) {
  return g.isObject(t) && t.isAxiosError === !0;
}
const ms = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(ms).forEach(([t, e]) => {
  ms[e] = t;
});
function Jh(t) {
  const e = new Cl(t),
    l = Th(Cl.prototype.request, e);
  return (
    g.extend(l, Cl.prototype, e, { allOwnKeys: !0 }),
    g.extend(l, e, null, { allOwnKeys: !0 }),
    (l.create = function (n) {
      return Jh(Hl(t, n));
    }),
    l
  );
}
const ht = Jh(Zn);
ht.Axios = Cl;
ht.CanceledError = Kn;
ht.CancelToken = gv;
ht.isCancel = Xh;
ht.VERSION = Af;
ht.toFormData = Ri;
ht.AxiosError = M;
ht.Cancel = ht.CanceledError;
ht.all = function (e) {
  return Promise.all(e);
};
ht.spread = vv;
ht.isAxiosError = bv;
ht.mergeConfig = Hl;
ht.AxiosHeaders = xt;
ht.formToJSON = (t) => Yh(g.isHTMLForm(t) ? new FormData(t) : t);
ht.getAdapter = Zh.getAdapter;
ht.HttpStatusCode = ms;
ht.default = ht;
const {
    Axios: jv,
    AxiosError: Yv,
    CanceledError: Xv,
    isCancel: Gv,
    CancelToken: Qv,
    VERSION: Vv,
    all: kv,
    Cancel: Zv,
    isAxiosError: Kv,
    spread: Jv,
    toFormData: $v,
    AxiosHeaders: Fv,
    HttpStatusCode: Wv,
    formToJSON: Pv,
    getAdapter: Iv,
    mergeConfig: t2,
    create: e2,
  } = ht,
  Kt = ht.create({ baseURL: "https://api.kabadfactory.com/api" });
function hs(t) {
  Kt.defaults.headers.common.Authorization = t ? `Bearer ${t}` : void 0;
}
function Sv({ data: t, setActiveModule: e }) {
  const l = t.dashboard || {},
    a = t.pickups || [],
    n = [
      ["Total Users", l.totalUsers ?? t.users.length, Oh],
      ["Total Orders", l.totalOrders ?? a.length, Ah],
      ["Revenue", `Rs ${l.revenue ?? 0}`, Sh],
      ["Pending Pickups", l.pendingPickups ?? 0, Sp],
      ["Completed", l.completedPickups ?? 0, dp],
    ];
  return v.createElement(
    v.Fragment,
    null,
    v.createElement(
      "header",
      { className: "topbar" },
      v.createElement(
        "div",
        null,
        v.createElement("h1", null, "Dashboard"),
        v.createElement("p", null, "Live overview from your MySQL database."),
      ),
      v.createElement(
        "button",
        { className: "primaryButton", onClick: () => e("offers") },
        "Create Offer",
      ),
    ),
    v.createElement(
      "section",
      { className: "statsGrid" },
      n.map(([u, i, c]) =>
        v.createElement(
          "article",
          { className: "stat", key: u },
          v.createElement(c, { size: 22 }),
          v.createElement("span", null, u),
          v.createElement("strong", null, i),
        ),
      ),
    ),
    v.createElement(
      "section",
      { className: "panel" },
      v.createElement(
        "div",
        { className: "panelHeader" },
        v.createElement("h2", null, "Latest Pickup Requests"),
        v.createElement(
          "button",
          { className: "ghostButton", onClick: () => e("pickups") },
          "View All",
        ),
      ),
      v.createElement(
        "div",
        { className: "tableWrap" },
        v.createElement(
          "table",
          null,
          v.createElement(
            "thead",
            null,
            v.createElement(
              "tr",
              null,
              v.createElement("th", null, "Order"),
              v.createElement("th", null, "Customer"),
              v.createElement("th", null, "Scrap"),
              v.createElement("th", null, "Slot"),
              v.createElement("th", null, "Status"),
            ),
          ),
          v.createElement(
            "tbody",
            null,
            a
              .slice(0, 8)
              .map((u) =>
                v.createElement(
                  "tr",
                  { key: u.id },
                  v.createElement("td", null, u.id),
                  v.createElement("td", null, u.customer),
                  v.createElement("td", null, u.scrap),
                  v.createElement("td", null, u.slot),
                  v.createElement(
                    "td",
                    null,
                    v.createElement("span", { className: "status" }, u.status),
                  ),
                ),
              ),
            a.length === 0 &&
              v.createElement(
                "tr",
                null,
                v.createElement(
                  "td",
                  { colSpan: "5" },
                  "No pickup requests in database yet.",
                ),
              ),
          ),
        ),
      ),
    ),
  );
}
function Ev({ onLogin: t }) {
  const [e, l] = L.useState("admin@kabadfactory.com"),
    [a, n] = L.useState("Admin@12345"),
    [u, i] = L.useState(""),
    [c, s] = L.useState(!1);
  async function f(d) {
    var y, m;
    (d.preventDefault(), s(!0), i(""));
    try {
      const p = await Kt.post("/admin/auth/login/", {
        identifier: e,
        password: a,
      });
      (hs(p.data.token),
        localStorage.setItem("kabadAdminToken", p.data.token),
        t(p.data.user));
    } catch (p) {
      i(
        ((m = (y = p.response) == null ? void 0 : y.data) == null
          ? void 0
          : m.message) || "Invalid admin credentials",
      );
    } finally {
      s(!1);
    }
  }
  return v.createElement(
    "main",
    { className: "loginScreen" },
    v.createElement(
      "form",
      { className: "loginCard", onSubmit: f },
      v.createElement(
        "div",
        { className: "loginMark" },
        v.createElement("img", {
          src: "/assets/kabad-factory-logo.png",
          alt: "Kabad Factory",
        }),
      ),
      v.createElement("h1", null, "Kabad Factory Admin"),
      v.createElement(
        "p",
        null,
        "Sign in with your admin email/mobile and password to manage database records.",
      ),
      v.createElement(
        "label",
        null,
        v.createElement("span", null, "Email or mobile"),
        v.createElement("input", {
          value: e,
          onChange: (d) => l(d.target.value),
          required: !0,
        }),
      ),
      v.createElement(
        "label",
        null,
        v.createElement("span", null, "Password"),
        v.createElement("input", {
          type: "password",
          value: a,
          onChange: (d) => n(d.target.value),
          required: !0,
        }),
      ),
      v.createElement(
        "div",
        { className: "hintBox" },
        v.createElement(sp, { size: 16 }),
        "Development default: admin@kabadfactory.com / Admin@12345",
      ),
      u && v.createElement("div", { className: "errorBox" }, u),
      v.createElement(
        "button",
        { className: "primaryButton", type: "submit", disabled: c },
        c ? "Signing in..." : "Login",
      ),
    ),
  );
}
const mc = {
    users: { name: "", mobile: "", email: "", password: "", status: "Active" },
    pickups: {
      customer: "",
      scrap: "",
      slot: "",
      executive: "Unassigned",
      executiveId: "",
      status: "Pending",
    },
    categories: {
      category: "",
      unit: "kg",
      price: "",
      description: "",
      status: "Active",
      iconUrl: "",
      iconFile: null,
      removeIcon: !1,
    },
    stores: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      status: "Active",
    },
    pickupCharges: {
      minDistanceKm: "0",
      maxDistanceKm: "",
      pickupCharge: "",
      status: "Active",
    },
    pincodeChargeCache: {
      pincode: "",
      nearestStore: "",
      storePincode: "",
      rawDistanceKm: "",
      distanceBufferKm: "",
      chargeableDistanceKm: "",
      pickupCharge: "",
      configurationVersion: "",
      status: "",
      calculatedAt: "",
    },
    executives: {
      name: "",
      mobile: "",
      area: "",
      password: "",
      assigned: "0",
      status: "Available",
    },
    executiveReports: {
      name: "",
      mobile: "",
      totalAssigned: "0",
      pending: "0",
      inProgress: "0",
      scrapCollected: "0",
      completed: "0",
      cancelled: "0",
      completionPercentage: "0",
      lastActivity: "",
    },
    offers: { title: "", audience: "", start: "", end: "", status: "Draft" },
    notifications: {
      title: "",
      type: "Offer",
      audience: "",
      sent: "0",
      status: "Draft",
    },
    support: {
      customer: "",
      mobile: "",
      subject: "",
      category: "",
      message: "",
      status: "Open",
      adminNote: "",
      created: "",
    },
    faqs: {
      question: "",
      answer: "",
      category: "General",
      displayOrder: "100",
      status: "Active",
    },
    privacy: {
      title: "Privacy Policy",
      content: "",
      version: "1",
      status: "Draft",
      createdAt: "",
      updatedAt: "",
    },
    terms: {
      title: "Terms and Conditions",
      content: "",
      version: "1",
      status: "Draft",
      createdAt: "",
      updatedAt: "",
    },
    payments: {
      order: "",
      customer: "",
      mode: "UPI",
      amount: "",
      status: "Pending",
    },
  },
  Av = {
    pickups: [
      "id",
      "customer",
      "scrap",
      "slot",
      "executive",
      "pickupCharge",
      "status",
    ],
    users: ["name", "mobile", "email", "status", "passwordAction"],
    categories: [
      "iconUrl",
      "category",
      "unit",
      "price",
      "description",
      "status",
    ],
    stores: ["name", "address", "city", "state", "pincode", "status"],
    pickupCharges: [
      "minDistanceKm",
      "maxDistanceKm",
      "pickupCharge",
      "distance",
      "status",
    ],
    pincodeChargeCache: [
      "pincode",
      "nearestStore",
      "storePincode",
      "rawDistanceKm",
      "distanceBufferKm",
      "chargeableDistanceKm",
      "pickupCharge",
      "configurationVersion",
      "status",
      "calculatedAt",
    ],
    executives: [
      "name",
      "mobile",
      "area",
      "assigned",
      "status",
      "passwordAction",
    ],
    executiveReports: [
      "name",
      "mobile",
      "totalAssigned",
      "pending",
      "inProgress",
      "scrapCollected",
      "completed",
      "cancelled",
      "completionPercentage",
      "lastActivity",
    ],
    offers: ["title", "audience", "start", "end", "status"],
    notifications: ["title", "type", "audience", "sent", "status"],
    support: [
      "customer",
      "mobile",
      "subject",
      "category",
      "message",
      "status",
      "adminNote",
      "created",
    ],
    faqs: ["question", "answer", "category", "displayOrder", "status"],
    privacy: [
      "title",
      "content",
      "version",
      "status",
      "createdAt",
      "updatedAt",
    ],
    terms: ["title", "content", "version", "status", "createdAt", "updatedAt"],
    payments: ["order", "customer", "mode", "amount", "pickupCharge", "status"],
  },
  Ov = {
    users: { status: ["Active", "Blocked"] },
    pickups: {
      status: [
        "Confirmed",
        "Executive Assigned",
        "Executive Reached",
        "Scrap Collected",
        "Payment Completed",
        "Completed",
        "Cancelled",
      ],
    },
    categories: { status: ["Active", "Hidden"], unit: ["kg", "piece"] },
    stores: { status: ["Active", "Hidden"] },
    pickupCharges: { status: ["Active", "Hidden"] },
    executives: { status: ["Available", "Busy", "Blocked"] },
    offers: { status: ["Active", "Draft"] },
    notifications: {
      status: ["Draft", "Sent", "Read"],
      type: ["Pickup", "Offer", "Order", "System"],
    },
    support: { status: ["Open", "In Progress", "Resolved", "Closed"] },
    faqs: { status: ["Active", "Inactive"] },
    privacy: { status: ["Draft", "Active"] },
    terms: { status: ["Draft", "Active"] },
    payments: {
      status: ["Pending", "Completed"],
      mode: ["cash", "upi", "razorpay"],
    },
  };
function Tv({
  moduleKey: t,
  config: e,
  rows: l,
  pagination: a,
  listState: n,
  setListState: u,
  reload: i,
  executiveOptions: c = [],
  alertApi: s,
  addRow: f,
  updateRow: d,
  deleteRow: y,
}) {
  const [m, p] = L.useState(!1),
    [T, A] = L.useState(mc[t]),
    [R, o] = L.useState(null),
    [r, h] = L.useState({}),
    [b, _] = L.useState(null),
    [N, D] = L.useState(""),
    [z, X] = L.useState(!1),
    w = L.useMemo(
      () =>
        Object.keys(mc[t]).filter(
          (O) => !["iconUrl", "iconFile", "removeIcon"].includes(O),
        ),
      [t],
    ),
    tt = Av[t],
    St = Ov[t] || {},
    Oe = e.canCreate !== !1,
    Et = e.canEdit !== !1,
    qt = e.readOnlyFields || [],
    S =
      t === "privacy" || t === "terms"
        ? [...qt, "createdAt", "updatedAt"]
        : t === "pickups"
          ? [...qt, "customer", "scrap", "slot"]
          : qt;
  async function C(O) {
    if ((O.preventDefault(), !z)) {
      X(!0);
      try {
        (await f(t, T),
          A(mc[t]),
          p(!1),
          s == null || s.success(`${Al(e.title)} saved successfully.`));
      } catch (x) {
        s == null ||
          s.error(
            ii(
              x,
              `Could not save ${Al(e.title).toLowerCase()}. Please try again.`,
            ),
          );
      } finally {
        X(!1);
      }
    }
  }
  function U(O) {
    (o(O.id), h({ ...O, executiveId: O.executiveId || "" }));
  }
  async function H() {
    if (z) return;
    const O = l.find((x) => x.id === R);
    if (
      t === "pickups" &&
      O != null &&
      O.executiveId &&
      String(O.executiveId) !== String(r.executiveId || "")
    ) {
      const x = c.find((st) => String(st.id) === String(r.executiveId || ""));
      if (
        !(await (s == null
          ? void 0
          : s.confirm({
              title: "Assign executive?",
              message: `Are you sure you want to assign this pickup request to ${(x == null ? void 0 : x.name) || r.executive || "the selected executive"}?`,
              confirmText: "Assign",
            })))
      )
        return;
    }
    X(!0);
    try {
      (await d(t, R, r),
        s == null ||
          s.success(
            t === "pickups"
              ? "Executive assigned successfully."
              : `${Al(e.title)} updated successfully.`,
          ),
        o(null),
        h({}));
    } catch (x) {
      s == null ||
        s.error(
          ii(
            x,
            `Could not update ${Al(e.title).toLowerCase()}. Please try again.`,
          ),
        );
    } finally {
      X(!1);
    }
  }
  return v.createElement(
    v.Fragment,
    null,
    v.createElement(
      "header",
      { className: "topbar" },
      v.createElement(
        "div",
        null,
        v.createElement("h1", null, e.title),
        v.createElement("p", null, e.subtitle),
      ),
      Oe &&
        v.createElement(
          "button",
          { className: "primaryButton", onClick: () => p((O) => !O) },
          m
            ? v.createElement(pf, { size: 18 })
            : v.createElement(yp, { size: 18 }),
          m ? "Cancel" : e.action,
        ),
    ),
    m &&
      v.createElement(
        "form",
        { className: "formPanel", onSubmit: C },
        t === "categories" &&
          v.createElement(vo, {
            value: T.iconUrl,
            file: T.iconFile,
            removeIcon: T.removeIcon,
            onFile: (O) => A((x) => ({ ...x, iconFile: O, removeIcon: !1 })),
            onRemove: () =>
              A((O) => ({ ...O, iconFile: null, iconUrl: "", removeIcon: !0 })),
          }),
        w.map((O) =>
          v.createElement(
            "label",
            { key: O },
            v.createElement("span", null, ys(O)),
            v.createElement(bo, {
              field: O,
              value: T[O],
              options: St[O],
              multiline: ["answer", "content", "message", "adminNote"].includes(
                O,
              ),
              onChange: (x) => A((k) => ({ ...k, [O]: x })),
              required: !["email", "description", "password"].includes(O),
            }),
          ),
        ),
        v.createElement(
          "button",
          { className: "primaryButton", type: "submit", disabled: z },
          v.createElement(gp, { size: 18 }),
          z ? "Saving..." : "Save",
        ),
      ),
    v.createElement(
      "section",
      { className: "panel" },
      v.createElement(
        "div",
        { className: "panelHeader" },
        v.createElement("h2", null, e.title),
        v.createElement(
          "span",
          { className: "countPill" },
          (a == null ? void 0 : a.totalRecords) ?? l.length,
          " records",
        ),
      ),
      v.createElement(
        "div",
        { className: "tableWrap" },
        v.createElement(
          "table",
          null,
          v.createElement(
            "thead",
            null,
            v.createElement(
              "tr",
              null,
              e.columns.map((O) =>
                v.createElement(
                  "th",
                  { key: O },
                  v.createElement(
                    "button",
                    {
                      className: "sortHeader",
                      type: "button",
                      onClick: () => Nv(O, n, u),
                    },
                    O,
                    v.createElement("span", null, Cv(O, n)),
                  ),
                ),
              ),
              Et && v.createElement("th", null, "Action"),
            ),
          ),
          v.createElement(
            "tbody",
            null,
            l.map((O) =>
              v.createElement(
                "tr",
                { key: O.id },
                tt.map((x) =>
                  v.createElement(
                    "td",
                    { key: `${O.id}-${x}` },
                    x === "passwordAction"
                      ? v.createElement(
                          "button",
                          {
                            className: "ghostButton smallButton",
                            type: "button",
                            onClick: () => {
                              (_(O), D(""));
                            },
                          },
                          v.createElement(fs, { size: 15 }),
                          "Reset",
                        )
                      : R === O.id && x !== "id" && !S.includes(x)
                        ? x === "executive" && t === "pickups"
                          ? v.createElement(Rv, {
                              value: r.executiveId || "",
                              disabled: ["Completed", "Cancelled"].includes(
                                O.status,
                              ),
                              options: c,
                              onChange: (k) => {
                                const st = c.find(
                                  (ot) => String(ot.id) === String(k),
                                );
                                h((ot) => ({
                                  ...ot,
                                  executiveId: k,
                                  executive: st ? st.name : "Unassigned",
                                }));
                              },
                            })
                          : x === "iconUrl"
                            ? v.createElement(vo, {
                                compact: !0,
                                value: r.iconUrl,
                                file: r.iconFile,
                                removeIcon: r.removeIcon,
                                onFile: (k) =>
                                  h((st) => ({
                                    ...st,
                                    iconFile: k,
                                    removeIcon: !1,
                                  })),
                                onRemove: () =>
                                  h((k) => ({
                                    ...k,
                                    iconFile: null,
                                    iconUrl: "",
                                    removeIcon: !0,
                                  })),
                              })
                            : v.createElement(bo, {
                                className: "inlineInput",
                                field: x,
                                value: r[x] || "",
                                options: St[x],
                                multiline: [
                                  "answer",
                                  "content",
                                  "message",
                                  "adminNote",
                                ].includes(x),
                                onChange: (k) => h((st) => ({ ...st, [x]: k })),
                              })
                        : x === "status"
                          ? v.createElement(
                              "span",
                              { className: "status" },
                              O[x],
                            )
                          : x === "iconUrl"
                            ? v.createElement($h, { src: O.iconUrl })
                            : O[x],
                  ),
                ),
                Et &&
                  v.createElement(
                    "td",
                    null,
                    R === O.id
                      ? v.createElement(
                          "button",
                          {
                            className: "iconButton",
                            onClick: H,
                            title: "Save",
                            type: "button",
                            disabled: z,
                          },
                          v.createElement(bh, { size: 18 }),
                        )
                      : v.createElement(
                          "div",
                          { className: "rowActions" },
                          v.createElement(
                            "button",
                            {
                              className: "iconButton",
                              onClick: () => U(O),
                              title: "Edit",
                              type: "button",
                            },
                            v.createElement(hp, { size: 18 }),
                          ),
                          e.canDelete &&
                            v.createElement(
                              "button",
                              {
                                className: "iconButton dangerIcon",
                                onClick: () => Uv(t, O.id, y, s, e),
                                title: "Delete",
                                type: "button",
                                disabled: z,
                              },
                              v.createElement(Ep, { size: 18 }),
                            ),
                        ),
                  ),
              ),
            ),
            l.length === 0 &&
              v.createElement(
                "tr",
                null,
                v.createElement(
                  "td",
                  { colSpan: e.columns.length + (Et ? 1 : 0) },
                  "No records found.",
                ),
              ),
          ),
        ),
      ),
    ),
    a &&
      v.createElement(_v, {
        pagination: a,
        listState: n,
        setListState: u,
        reload: i,
      }),
    b &&
      v.createElement(Mv, {
        row: b,
        password: N,
        setPassword: D,
        saving: z,
        onClose: () => {
          (_(null), D(""));
        },
        onSave: () =>
          zv(t, b, N, d, s, X, () => {
            (_(null), D(""));
          }),
      }),
  );
}
function Rv({ value: t, options: e, onChange: l, disabled: a }) {
  return v.createElement(
    "select",
    {
      className: "selectInput executiveSelect",
      value: t || "",
      onChange: (n) => l(n.target.value),
      disabled: a,
    },
    v.createElement("option", { value: "" }, "Unassigned"),
    e.map((n) =>
      v.createElement(
        "option",
        { key: n.id, value: n.id },
        n.name || "Executive",
        " - ",
        n.mobile,
        " (",
        n.availability,
        ", ",
        n.activeAssigned,
        " active)",
      ),
    ),
  );
}
function vo({
  value: t,
  file: e,
  removeIcon: l,
  onFile: a,
  onRemove: n,
  compact: u = !1,
}) {
  const [i, c] = L.useState(""),
    s = e ? URL.createObjectURL(e) : l ? "" : t;
  function f(d) {
    var p;
    const y = (p = d.target.files) == null ? void 0 : p[0];
    if (!y) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(y.type)) {
      (c("Use PNG, JPG, JPEG, or WebP."), (d.target.value = ""));
      return;
    }
    if (y.size > 2 * 1024 * 1024) {
      (c("Icon must be 2 MB or smaller."), (d.target.value = ""));
      return;
    }
    (c(""), a(y));
  }
  return v.createElement(
    "label",
    { className: u ? "iconUpload compact" : "iconUpload" },
    v.createElement("span", null, "Category Icon"),
    v.createElement(
      "div",
      { className: "iconUploadRow" },
      v.createElement($h, { src: s }),
      v.createElement(
        "div",
        { className: "iconUploadActions" },
        v.createElement("input", {
          type: "file",
          accept: "image/png,image/jpeg,image/webp",
          onChange: f,
        }),
        s &&
          v.createElement(
            "button",
            { type: "button", className: "ghostButton", onClick: n },
            "Remove",
          ),
        v.createElement(
          "small",
          null,
          "Optional. PNG, JPG, JPEG, or WebP. Max 2 MB.",
        ),
        i && v.createElement("small", { className: "fieldError" }, i),
      ),
    ),
  );
}
function $h({ src: t }) {
  const [e, l] = L.useState(!1);
  return v.createElement(
    "div",
    { className: "categoryIconPreview" },
    t && !e
      ? v.createElement("img", {
          src: t,
          alt: "Category icon preview",
          onError: () => l(!0),
        })
      : v.createElement(ip, { size: 20 }),
  );
}
function _v({ pagination: t, listState: e, setListState: l, reload: a }) {
  const n = Number(t.page || e.page || 1),
    u = Math.max(Number(t.totalPages || 1), 1),
    i = Number(t.totalRecords ?? t.total ?? 0);
  function c(f) {
    const d = Math.min(Math.max(Number(f), 1), u),
      y = { ...e, page: d };
    l(y);
  }
  function s(f) {
    const d = { ...e, page: 1, limit: Number(f.target.value) };
    l(d);
  }
  return v.createElement(
    "div",
    { className: "paginationBar" },
    v.createElement("span", null, "Page ", n, " of ", u, " - ", i, " records"),
    v.createElement(
      "select",
      { value: e.limit, onChange: s, className: "selectInput pageSize" },
      [10, 20, 50, 100].map((f) =>
        v.createElement("option", { key: f, value: f }, f, " / page"),
      ),
    ),
    v.createElement(
      "button",
      { className: "ghostButton", disabled: n <= 1, onClick: () => c(n - 1) },
      "Previous",
    ),
    v.createElement(
      "div",
      { className: "pageNumbers", "aria-label": "Pagination pages" },
      Dv(n, u).map((f) =>
        v.createElement(
          "button",
          {
            key: f,
            type: "button",
            className: f === n ? "pageNumber active" : "pageNumber",
            onClick: () => c(f),
            "aria-current": f === n ? "page" : void 0,
          },
          f,
        ),
      ),
    ),
    v.createElement(
      "button",
      { className: "ghostButton", disabled: n >= u, onClick: () => c(n + 1) },
      "Next",
    ),
  );
}
function Dv(t, e) {
  const l = Math.max(1, Math.min(t - 2, e - 4)),
    a = Math.min(e, l + 4);
  return Array.from({ length: a - l + 1 }, (n, u) => l + u);
}
function Mv({
  row: t,
  password: e,
  setPassword: l,
  saving: a,
  onClose: n,
  onSave: u,
}) {
  return v.createElement(
    "div",
    { className: "alertOverlay", role: "dialog", "aria-modal": "true" },
    v.createElement(
      "div",
      { className: "alertDialog passwordDialog" },
      v.createElement(
        "button",
        { className: "alertClose", type: "button", onClick: n },
        v.createElement(pf, { size: 18 }),
      ),
      v.createElement(
        "div",
        { className: "alertIcon info" },
        v.createElement(fs, { size: 22 }),
      ),
      v.createElement("h2", null, "Reset Password"),
      v.createElement(
        "p",
        null,
        "Set a new password for ",
        t.name || t.mobile,
        ". The old password will not be shown.",
      ),
      v.createElement(
        "label",
        { className: "passwordField" },
        v.createElement("span", null, "New Password"),
        v.createElement("input", {
          type: "password",
          value: e,
          onChange: (i) => l(i.target.value),
          placeholder: "Minimum 6 characters",
          minLength: 6,
          maxLength: 20,
          autoFocus: !0,
        }),
      ),
      v.createElement(
        "div",
        { className: "alertActions" },
        v.createElement(
          "button",
          {
            className: "secondaryButton",
            type: "button",
            onClick: n,
            disabled: a,
          },
          "Cancel",
        ),
        v.createElement(
          "button",
          {
            className: "primaryButton",
            type: "button",
            onClick: u,
            disabled: a,
          },
          v.createElement(fs, { size: 16 }),
          a ? "Saving..." : "Reset Password",
        ),
      ),
    ),
  );
}
const Fh = {
  Order: "createdAt",
  Customer: "customer",
  Executive: "executive",
  Status: "status",
  Category: "name",
  Name: "name",
  Mobile: "mobile",
  Assigned: "assigned",
  Pending: "pending",
  Completed: "completed",
  "Completion %": "completionPercentage",
  "Last Activity": "lastActivity",
};
function Nv(t, e, l, a) {
  const n = Fh[t];
  if (!n) return;
  const u = e.sortBy === n && e.sortOrder === "asc" ? "desc" : "asc",
    i = { ...e, sortBy: n, sortOrder: u, page: 1 };
  l(i);
}
function Cv(t, e) {
  const l = Fh[t];
  return !l || e.sortBy !== l ? "" : e.sortOrder === "asc" ? " ↑" : " ↓";
}
function bo({
  className: t = "",
  field: e,
  value: l,
  options: a,
  onChange: n,
  required: u = !1,
  multiline: i = !1,
}) {
  return a != null && a.length
    ? v.createElement(
        "select",
        {
          className: t || "selectInput",
          value: l || a[0],
          onChange: (c) => n(c.target.value),
          required: u,
        },
        a.map((c) => v.createElement("option", { key: c, value: c }, c)),
      )
    : i
      ? v.createElement("textarea", {
          className: t || "textAreaInput",
          value: l,
          onChange: (c) => n(c.target.value),
          placeholder: ys(e),
          required: u,
        })
      : v.createElement("input", {
          type: e === "password" || e === "newPassword" ? "password" : "text",
          className: t,
          value: l,
          onChange: (c) => n(c.target.value),
          placeholder: ys(e),
          required: u,
          maxLength: e === "password" || e === "newPassword" ? 20 : void 0,
        });
}
async function zv(t, e, l, a, n, u, i) {
  if (!l || l.length < 6) {
    n == null || n.error("Password must be at least 6 characters.");
    return;
  }
  if (
    await (n == null
      ? void 0
      : n.confirm({
          title: "Reset password?",
          message: `Set a new password for ${e.name || e.mobile}?`,
          confirmText: "Reset",
        }))
  ) {
    u(!0);
    try {
      (await a(t, e.id, { ...e, newPassword: l }),
        n == null || n.success("Password updated successfully."),
        i == null || i());
    } catch (s) {
      n == null ||
        n.error(ii(s, "Could not update password. Please try again."));
    } finally {
      u(!1);
    }
  }
}
async function Uv(t, e, l, a, n) {
  if (
    !(
      !l ||
      !(await (a == null
        ? void 0
        : a.confirm({
            title: `Delete ${Al(n.title).toLowerCase()}?`,
            message: "This action cannot be undone.",
            confirmText: "Delete",
            variant: "danger",
            type: "warning",
          })))
    )
  )
    try {
      (await l(t, e),
        a == null || a.success(`${Al(n.title)} deleted successfully.`));
    } catch (i) {
      a == null ||
        a.error(
          ii(
            i,
            `Could not delete ${Al(n.title).toLowerCase()}. Please try again.`,
          ),
        );
    }
}
function ys(t) {
  return t.replace(/([A-Z])/g, " $1").replace(/^./, (e) => e.toUpperCase());
}
function Al(t = "record") {
  return (
    String(t)
      .replace(/Management|Reports|Requests/g, "")
      .trim() || "Record"
  );
}
function ii(t, e) {
  var a, n;
  const l =
    ((n = (a = t == null ? void 0 : t.response) == null ? void 0 : a.data) ==
    null
      ? void 0
      : n.message) ||
    (t == null ? void 0 : t.message) ||
    e;
  return /sql|unknown column|syntax|stack|database/i.test(l) ? e : l;
}
const xv = { success: bh, error: tp, warning: Ir, info: Eh, confirm: Ir };
function wv({ alert: t, onClose: e, onConfirm: l }) {
  if (!t) return null;
  const a = xv[t.type] || Eh,
    n = t.variant === "danger";
  return v.createElement(
    "div",
    { className: "alertOverlay", role: "dialog", "aria-modal": "true" },
    v.createElement(
      "div",
      { className: `alertDialog ${t.type}` },
      v.createElement(
        "button",
        {
          className: "alertClose",
          onClick: e,
          type: "button",
          "aria-label": "Close dialog",
        },
        v.createElement(pf, { size: 18 }),
      ),
      v.createElement(
        "div",
        { className: "alertIcon" },
        v.createElement(a, { size: 28 }),
      ),
      v.createElement("h2", null, t.title),
      t.message ? v.createElement("p", null, t.message) : null,
      v.createElement(
        "div",
        { className: "alertActions" },
        t.confirm
          ? v.createElement(
              v.Fragment,
              null,
              v.createElement(
                "button",
                {
                  className: "ghostButton",
                  onClick: e,
                  type: "button",
                  disabled: t.loading,
                },
                t.cancelText || "Cancel",
              ),
              v.createElement(
                "button",
                {
                  className: n ? "dangerButton" : "primaryButton",
                  onClick: l,
                  type: "button",
                  disabled: t.loading,
                },
                t.loading ? "Please wait..." : t.confirmText || "Confirm",
              ),
            )
          : v.createElement(
              "button",
              { className: "primaryButton", onClick: e, type: "button" },
              "OK",
            ),
      ),
    ),
  );
}
const So = [
    { key: "dashboard", label: "Dashboard", icon: cp },
    { key: "users", label: "Users", icon: Oh },
    { key: "pickups", label: "Pickup Requests", icon: Ah },
    { key: "stores", label: "Store Locations", icon: rp },
    { key: "pickupCharges", label: "Pickup Charges", icon: Sh },
    { key: "pincodeChargeCache", label: "PIN Charge Cache", icon: lp },
    { key: "categories", label: "Scrap Categories", icon: P1 },
    { key: "executives", label: "Executives", icon: mp },
    { key: "executiveReports", label: "Executive Reports", icon: I1 },
    { key: "offers", label: "Offers", icon: op },
    { key: "notifications", label: "Notifications", icon: W1 },
    { key: "support", label: "Support Queries", icon: up },
    { key: "faqs", label: "FAQ Management", icon: ap },
    { key: "privacy", label: "Privacy Policy", icon: bp },
    { key: "terms", label: "Terms & Conditions", icon: np },
    { key: "payments", label: "Payment Reports", icon: ep },
  ],
  Za = {
    users: {
      title: "User Management",
      subtitle: "Database customers from the users table.",
      action: "Add User",
      columns: ["Name", "Mobile", "Email", "Status", "Password"],
    },
    pickups: {
      title: "Pickup Request Management",
      subtitle:
        "Live bookings joined with users, executives, and booking items.",
      action: "Create Pickup",
      columns: [
        "Order",
        "Customer",
        "Scrap",
        "Slot",
        "Executive",
        "Pickup Charge",
        "Status",
      ],
      canCreate: !1,
    },
    categories: {
      title: "Scrap Categories",
      subtitle: "Database category names, prices, units, and visibility.",
      action: "Add Category",
      columns: ["Icon", "Category", "Unit", "Price", "Description", "Status"],
    },
    stores: {
      title: "Store Locations",
      subtitle:
        "Active stores used for nearest-store pickup charge calculations.",
      action: "Add Store",
      columns: ["Store", "Address", "City", "State", "PIN Code", "Status"],
      apiPath: "/admin/stores",
    },
    pickupCharges: {
      title: "Pickup Charges",
      subtitle:
        "Distance-based pickup charge slabs used by the scheduling flow.",
      action: "Add Slab",
      columns: ["Min Km", "Max Km", "Charge", "Distance", "Status"],
      apiPath: "/admin/pickup-charges",
    },
    pincodeChargeCache: {
      title: "PIN Charge Cache",
      subtitle:
        "Read-only cached nearest-store and pickup-charge results by customer PIN code.",
      action: "Refresh",
      columns: [
        "PIN Code",
        "Nearest Store",
        "Store PIN",
        "Raw Distance",
        "Buffer",
        "Chargeable Distance",
        "Pickup Charge",
        "Version",
        "Status",
        "Calculated",
      ],
      apiPath: "/admin/pincode-pickup-charge-cache",
      canCreate: !1,
      canEdit: !1,
    },
    executives: {
      title: "Executive Management",
      subtitle: "Pickup executives stored as users with role executive.",
      action: "Add Executive",
      columns: ["Name", "Mobile", "Area", "Assigned", "Status", "Password"],
    },
    executiveReports: {
      title: "Executive Reports",
      subtitle: "Executive workload, performance, and pickup status breakdown.",
      action: "Export",
      columns: [
        "Executive",
        "Mobile",
        "Assigned",
        "Pending",
        "In Progress",
        "Collected",
        "Completed",
        "Cancelled",
        "Completion %",
        "Last Activity",
      ],
      apiPath: "/admin/executive-reports",
      canCreate: !1,
      canEdit: !1,
    },
    offers: {
      title: "Offers",
      subtitle: "Promotions from the offers table.",
      action: "Create Offer",
      columns: ["Title", "Audience", "Start", "End", "Status"],
    },
    notifications: {
      title: "Notifications",
      subtitle: "Records from the notifications table.",
      action: "Send Notification",
      columns: ["Title", "Type", "Audience", "Sent", "Status"],
    },
    support: {
      title: "Support Queries",
      subtitle: "Customer help requests submitted from the mobile app.",
      action: "Create Query",
      columns: [
        "Customer",
        "Mobile",
        "Subject",
        "Category",
        "Message",
        "Status",
        "Admin Note",
        "Created",
      ],
      canCreate: !1,
      readOnlyFields: [
        "customer",
        "mobile",
        "subject",
        "category",
        "message",
        "created",
      ],
    },
    faqs: {
      title: "FAQ Management",
      subtitle:
        "Create, edit, delete, activate, deactivate, categorize, and order FAQs.",
      action: "Add FAQ",
      columns: ["Question", "Answer", "Category", "Display Order", "Status"],
      canDelete: !0,
    },
    privacy: {
      title: "Privacy Policy Management",
      subtitle:
        "Manage privacy policy versions and publish one active version.",
      action: "Add Version",
      columns: ["Title", "Content", "Version", "Status", "Created", "Updated"],
      apiPath: "/admin/cms/privacy",
    },
    terms: {
      title: "Terms and Conditions Management",
      subtitle: "Manage terms versions and publish one active version.",
      action: "Add Version",
      columns: ["Title", "Content", "Version", "Status", "Created", "Updated"],
      apiPath: "/admin/cms/terms",
    },
    payments: {
      title: "Payment Reports",
      subtitle: "Payment view generated from booking totals and payment mode.",
      action: "Export Report",
      columns: [
        "Order",
        "Customer",
        "Mode",
        "Amount",
        "Pickup Charge",
        "Status",
      ],
      canCreate: !1,
      canEdit: !1,
    },
  },
  Eo = {
    dashboard: null,
    users: [],
    pickups: [],
    categories: [],
    stores: [],
    pickupCharges: [],
    pincodeChargeCache: [],
    executives: [],
    executiveReports: [],
    offers: [],
    notifications: [],
    support: [],
    faqs: [],
    privacy: [],
    terms: [],
    payments: [],
  };
function Bv() {
  const [t, e] = L.useState("dashboard"),
    [l, a] = L.useState(""),
    [n, u] = L.useState(Eo),
    [i, c] = L.useState(() => {
      const S = localStorage.getItem("kabadAdminToken");
      return S ? (hs(S), { token: S }) : null;
    }),
    [s, f] = L.useState(!1),
    [d, y] = L.useState(""),
    [m, p] = L.useState({}),
    [T, A] = L.useState({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
      status: "",
    }),
    [R, o] = L.useState([]),
    [r, h] = L.useState(null),
    b = L.useMemo(
      () => ({
        success(S, C = "Success") {
          h({ type: "success", title: C, message: S });
        },
        error(S, C = "Something went wrong") {
          h({ type: "error", title: C, message: S });
        },
        info(S, C = "Information") {
          h({ type: "info", title: C, message: S });
        },
        confirm(S) {
          return new Promise((C) => {
            h({
              type: S.type || "confirm",
              title: S.title || "Are you sure?",
              message: S.message,
              confirm: !0,
              confirmText: S.confirmText || "Confirm",
              cancelText: S.cancelText || "Cancel",
              variant: S.variant,
              onResolve: C,
            });
          });
        },
      }),
      [],
    );
  function _() {
    var S;
    (r != null && r.confirm && ((S = r.onResolve) == null || S.call(r, !1)),
      h(null));
  }
  function N() {
    var S;
    ((S = r == null ? void 0 : r.onResolve) == null || S.call(r, !0), h(null));
  }
  const D = L.useCallback(() => {
      (localStorage.removeItem("kabadAdminToken"), hs(null), c(null), u(Eo));
    }, []),
    z = L.useCallback(async () => {
      const [S, C, U, H] = await Promise.all([
        Kt.get("/admin/dashboard"),
        Kt.get("/admin/pickups"),
        Kt.get("/admin/users"),
        Kt.get("/admin/payments"),
      ]);
      u((O) => ({
        ...O,
        dashboard: S.data,
        pickups: C.data.data,
        users: U.data.data,
        payments: H.data.data,
      }));
    }, []),
    X = L.useCallback(
      async (S, C = {}) => {
        var st;
        if (S === "dashboard") {
          await z();
          return;
        }
        const U = { ...T, ...C },
          H = ((st = Za[S]) == null ? void 0 : st.apiPath) || `/admin/${S}`;
        let O = U,
          x = await Kt.get(H, {
            params: {
              page: O.page,
              limit: O.limit,
              search: l,
              sortBy: O.sortBy,
              sortOrder: O.sortOrder,
              status: O.status,
            },
          }),
          k = x.data.pagination || null;
        (k &&
          O.page > k.totalPages &&
          ((O = { ...O, page: k.totalPages }),
          A(O),
          (x = await Kt.get(H, {
            params: {
              page: O.page,
              limit: O.limit,
              search: l,
              sortBy: O.sortBy,
              sortOrder: O.sortOrder,
              status: O.status,
            },
          })),
          (k = x.data.pagination || null)),
          u((ot) => ({ ...ot, [S]: x.data.data })),
          p((ot) => ({ ...ot, [S]: k })));
      },
      [T, z, l],
    ),
    w = L.useCallback(async () => {
      const S = await Kt.get("/admin/executive-options");
      o(S.data.data || []);
    }, []);
  (L.useEffect(() => {
    if (!i) return;
    let S = !1;
    (f(!0), y(""));
    const C = setTimeout(() => {
      X(t)
        .catch((U) => {
          var H, O, x, k;
          if (
            ((H = U.response) == null ? void 0 : H.status) === 401 ||
            ((O = U.response) == null ? void 0 : O.status) === 403
          ) {
            D();
            return;
          }
          S ||
            y(
              ((k = (x = U.response) == null ? void 0 : x.data) == null
                ? void 0
                : k.message) || "Could not load admin data",
            );
        })
        .finally(() => {
          S || f(!1);
        });
    }, 350);
    return () => {
      ((S = !0), clearTimeout(C));
    };
  }, [t, X, D, i]),
    L.useEffect(() => {
      i && w().catch(() => {});
    }, [w, i]),
    L.useEffect(() => {
      i != null &&
        i.token &&
        Kt.get("/admin/auth/me").catch((S) => {
          var C, U;
          (((C = S.response) == null ? void 0 : C.status) === 401 ||
            ((U = S.response) == null ? void 0 : U.status) === 403) &&
            D();
        });
    }, [D, i]));
  const tt = So.find((S) => S.key === t),
    St = L.useMemo(() => n[t] || [], [t, n]);
  async function Oe(S, C) {
    var H;
    const U = await Kt.post(
      ((H = Za[S]) == null ? void 0 : H.apiPath) || `/admin/${S}`,
      Ao(S, C),
    );
    return (u((O) => ({ ...O, [S]: [U.data, ...(O[S] || [])] })), await z(), U);
  }
  async function Et(S, C, U) {
    var x;
    const H = U.rawId || String(C).replace(/\D/g, "") || C,
      O = ((x = Za[S]) == null ? void 0 : x.apiPath) || `/admin/${S}`;
    (await Kt.patch(`${O}/${H}`, Ao(S, U)), await X(S), await z());
  }
  async function qt(S, C) {
    var H;
    const U = ((H = Za[S]) == null ? void 0 : H.apiPath) || `/admin/${S}`;
    (await Kt.delete(`${U}/${C}`), await X(S));
  }
  return i
    ? v.createElement(
        "div",
        { className: "shell" },
        v.createElement(
          "aside",
          { className: "sidebar" },
          v.createElement(
            "div",
            { className: "brand" },
            v.createElement(
              "div",
              { className: "brandMark" },
              v.createElement("img", {
                src: "/assets/kabad-factory-logo.png",
                alt: "Kabad Factory",
              }),
            ),
            v.createElement(
              "div",
              null,
              v.createElement("span", null, "Admin Console"),
            ),
          ),
          v.createElement(
            "nav",
            null,
            So.map(({ key: S, label: C, icon: U }) =>
              v.createElement(
                "button",
                {
                  className: t === S ? "navItem active" : "navItem",
                  key: S,
                  onClick: () => {
                    (e(S),
                      a(""),
                      A({
                        page: 1,
                        limit: 10,
                        sortBy:
                          S === "executiveReports"
                            ? "lastActivity"
                            : "createdAt",
                        sortOrder: "desc",
                        status: "",
                      }));
                  },
                },
                v.createElement(U, { size: 18 }),
                C,
              ),
            ),
          ),
        ),
        v.createElement(
          "main",
          { className: "main" },
          v.createElement(
            "div",
            { className: "utilityBar" },
            v.createElement(
              "div",
              { className: "searchBox" },
              v.createElement(vp, { size: 18 }),
              v.createElement("input", {
                value: l,
                onChange: (S) => {
                  (a(S.target.value), A((C) => ({ ...C, page: 1 })));
                },
                placeholder: `Search ${(tt == null ? void 0 : tt.label) || "records"}`,
              }),
            ),
            v.createElement(
              "div",
              { className: "utilityActions" },
              v.createElement(
                "button",
                { className: "ghostButton", onClick: () => X(t), disabled: s },
                v.createElement(pp, { size: 16 }),
                "Refresh",
              ),
              v.createElement(
                "button",
                { className: "ghostButton", onClick: D },
                v.createElement(fp, { size: 16 }),
                "Logout",
              ),
            ),
          ),
          d && v.createElement("div", { className: "errorBox" }, d),
          s &&
            v.createElement(
              "div",
              { className: "loadingBox" },
              "Loading database data...",
            ),
          t === "dashboard"
            ? v.createElement(Sv, { setActiveModule: e, data: n })
            : v.createElement(Tv, {
                moduleKey: t,
                config: Za[t],
                rows: St,
                pagination: m[t],
                listState: T,
                setListState: A,
                reload: (S) => X(t, S),
                executiveOptions: R,
                alertApi: b,
                addRow: Oe,
                updateRow: Et,
                deleteRow: qt,
              }),
        ),
        v.createElement(wv, { alert: r, onClose: _, onConfirm: N }),
      )
    : v.createElement(Ev, { onLogin: c });
}
function Ao(t, e) {
  if (t !== "categories") return e;
  const l = new FormData();
  return (
    Object.entries(e).forEach(([a, n]) => {
      if (!(a === "iconUrl" || n === void 0 || n === null)) {
        if (a === "iconFile") {
          n && l.append("iconFile", n);
          return;
        }
        l.append(a, n);
      }
    }),
    l
  );
}
K1.createRoot(document.getElementById("root")).render(
  v.createElement(v.StrictMode, null, v.createElement(Bv, null)),
);
