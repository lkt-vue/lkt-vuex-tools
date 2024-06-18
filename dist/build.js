import { watch as L, effectScope as W, reactive as G, computed as Y } from "vue";
function q() {
  return M().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function M() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const X = typeof Proxy == "function", z = "devtools-plugin:setup", Z = "plugin:settings:set";
let b, N;
function tt() {
  var e;
  return b !== void 0 || (typeof window < "u" && window.performance ? (b = !0, N = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (b = !0, N = globalThis.perf_hooks.performance) : b = !1), b;
}
function et() {
  return tt() ? N.now() : Date.now();
}
class rt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const i in t.settings) {
        const c = t.settings[i];
        r[i] = c.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const i = localStorage.getItem(o), c = JSON.parse(i);
      Object.assign(s, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        s = i;
      },
      now() {
        return et();
      }
    }, n && n.on(Z, (i, c) => {
      i === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, c) => this.target ? this.target.on[c] : (...a) => {
        this.onQueue.push({
          method: c,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...a) => (this.targetQueue.push({
        method: c,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[c](...a)) : (...a) => new Promise((l) => {
        this.targetQueue.push({
          method: c,
          args: a,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function nt(e, t) {
  const n = e, r = M(), o = q(), s = X && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(z, e, t);
  else {
    const i = s ? new rt(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var ot = "store";
function m(e, t) {
  Object.keys(e).forEach(function(n) {
    return t(e[n], n);
  });
}
function it(e) {
  return e !== null && typeof e == "object";
}
function st(e) {
  return e && typeof e.then == "function";
}
function v(e, t) {
  if (!e)
    throw new Error("[vuex] " + t);
}
function ct(e, t) {
  return function() {
    return e(t);
  };
}
function P(e, t, n) {
  return t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)), function() {
    var r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
  };
}
function $(e, t) {
  e._actions = /* @__PURE__ */ Object.create(null), e._mutations = /* @__PURE__ */ Object.create(null), e._wrappedGetters = /* @__PURE__ */ Object.create(null), e._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var n = e.state;
  O(e, n, [], e._modules.root, !0), x(e, n, t);
}
function x(e, t, n) {
  var r = e._state, o = e._scope;
  e.getters = {}, e._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var s = e._wrappedGetters, i = {}, c = {}, a = W(!0);
  a.run(function() {
    m(s, function(l, u) {
      i[u] = ct(l, e), c[u] = Y(function() {
        return i[u]();
      }), Object.defineProperty(e.getters, u, {
        get: function() {
          return c[u].value;
        },
        enumerable: !0
        // for local getters
      });
    });
  }), e._state = G({
    data: t
  }), e._scope = a, e.strict && dt(e), r && n && e._withCommit(function() {
    r.data = null;
  }), o && o.stop();
}
function O(e, t, n, r, o) {
  var s = !n.length, i = e._modules.getNamespace(n);
  if (r.namespaced && (e._modulesNamespaceMap[i] && process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate namespace " + i + " for the namespaced module " + n.join("/")), e._modulesNamespaceMap[i] = r), !s && !o) {
    var c = C(t, n.slice(0, -1)), a = n[n.length - 1];
    e._withCommit(function() {
      process.env.NODE_ENV !== "production" && a in c && console.warn(
        '[vuex] state field "' + a + '" was overridden by a module with the same name at "' + n.join(".") + '"'
      ), c[a] = r.state;
    });
  }
  var l = r.context = at(e, i, n);
  r.forEachMutation(function(u, f) {
    var h = i + f;
    ut(e, h, u, l);
  }), r.forEachAction(function(u, f) {
    var h = u.root ? f : i + f, d = u.handler || u;
    ft(e, h, d, l);
  }), r.forEachGetter(function(u, f) {
    var h = i + f;
    lt(e, h, u, l);
  }), r.forEachChild(function(u, f) {
    O(e, t, n.concat(f), u, o);
  });
}
function at(e, t, n) {
  var r = t === "", o = {
    dispatch: r ? e.dispatch : function(s, i, c) {
      var a = E(s, i, c), l = a.payload, u = a.options, f = a.type;
      if ((!u || !u.root) && (f = t + f, process.env.NODE_ENV !== "production" && !e._actions[f])) {
        console.error("[vuex] unknown local action type: " + a.type + ", global type: " + f);
        return;
      }
      return e.dispatch(f, l);
    },
    commit: r ? e.commit : function(s, i, c) {
      var a = E(s, i, c), l = a.payload, u = a.options, f = a.type;
      if ((!u || !u.root) && (f = t + f, process.env.NODE_ENV !== "production" && !e._mutations[f])) {
        console.error("[vuex] unknown local mutation type: " + a.type + ", global type: " + f);
        return;
      }
      e.commit(f, l, u);
    }
  };
  return Object.defineProperties(o, {
    getters: {
      get: r ? function() {
        return e.getters;
      } : function() {
        return k(e, t);
      }
    },
    state: {
      get: function() {
        return C(e.state, n);
      }
    }
  }), o;
}
function k(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var n = {}, r = t.length;
    Object.keys(e.getters).forEach(function(o) {
      if (o.slice(0, r) === t) {
        var s = o.slice(r);
        Object.defineProperty(n, s, {
          get: function() {
            return e.getters[o];
          },
          enumerable: !0
        });
      }
    }), e._makeLocalGettersCache[t] = n;
  }
  return e._makeLocalGettersCache[t];
}
function ut(e, t, n, r) {
  var o = e._mutations[t] || (e._mutations[t] = []);
  o.push(function(i) {
    n.call(e, r.state, i);
  });
}
function ft(e, t, n, r) {
  var o = e._actions[t] || (e._actions[t] = []);
  o.push(function(i) {
    var c = n.call(e, {
      dispatch: r.dispatch,
      commit: r.commit,
      getters: r.getters,
      state: r.state,
      rootGetters: e.getters,
      rootState: e.state
    }, i);
    return st(c) || (c = Promise.resolve(c)), e._devtoolHook ? c.catch(function(a) {
      throw e._devtoolHook.emit("vuex:error", a), a;
    }) : c;
  });
}
function lt(e, t, n, r) {
  if (e._wrappedGetters[t]) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] duplicate getter key: " + t);
    return;
  }
  e._wrappedGetters[t] = function(s) {
    return n(
      r.state,
      // local state
      r.getters,
      // local getters
      s.state,
      // root state
      s.getters
      // root getters
    );
  };
}
function dt(e) {
  L(function() {
    return e._state.data;
  }, function() {
    process.env.NODE_ENV !== "production" && v(e._committing, "do not mutate vuex store state outside mutation handlers.");
  }, { deep: !0, flush: "sync" });
}
function C(e, t) {
  return t.reduce(function(n, r) {
    return n[r];
  }, e);
}
function E(e, t, n) {
  return it(e) && e.type && (n = t, t = e, e = e.type), process.env.NODE_ENV !== "production" && v(typeof e == "string", "expects string as the type, but found " + typeof e + "."), { type: e, payload: t, options: n };
}
var ht = "vuex bindings", j = "vuex:mutations", w = "vuex:actions", y = "vuex", pt = 0;
function vt(e, t) {
  nt(
    {
      id: "org.vuejs.vuex",
      app: e,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [ht]
    },
    function(n) {
      n.addTimelineLayer({
        id: j,
        label: "Vuex Mutations",
        color: I
      }), n.addTimelineLayer({
        id: w,
        label: "Vuex Actions",
        color: I
      }), n.addInspector({
        id: y,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      }), n.on.getInspectorTree(function(r) {
        if (r.app === e && r.inspectorId === y)
          if (r.filter) {
            var o = [];
            Q(o, t._modules.root, r.filter, ""), r.rootNodes = o;
          } else
            r.rootNodes = [
              H(t._modules.root, "")
            ];
      }), n.on.getInspectorState(function(r) {
        if (r.app === e && r.inspectorId === y) {
          var o = r.nodeId;
          k(t, o), r.state = gt(
            yt(t._modules, o),
            o === "root" ? t.getters : t._makeLocalGettersCache,
            o
          );
        }
      }), n.on.editInspectorState(function(r) {
        if (r.app === e && r.inspectorId === y) {
          var o = r.nodeId, s = r.path;
          o !== "root" && (s = o.split("/").filter(Boolean).concat(s)), t._withCommit(function() {
            r.set(t._state.data, s, r.state.value);
          });
        }
      }), t.subscribe(function(r, o) {
        var s = {};
        r.payload && (s.payload = r.payload), s.state = o, n.notifyComponentUpdate(), n.sendInspectorTree(y), n.sendInspectorState(y), n.addTimelineEvent({
          layerId: j,
          event: {
            time: Date.now(),
            title: r.type,
            data: s
          }
        });
      }), t.subscribeAction({
        before: function(r, o) {
          var s = {};
          r.payload && (s.payload = r.payload), r._id = pt++, r._time = Date.now(), s.state = o, n.addTimelineEvent({
            layerId: w,
            event: {
              time: r._time,
              title: r.type,
              groupId: r._id,
              subtitle: "start",
              data: s
            }
          });
        },
        after: function(r, o) {
          var s = {}, i = Date.now() - r._time;
          s.duration = {
            _custom: {
              type: "duration",
              display: i + "ms",
              tooltip: "Action duration",
              value: i
            }
          }, r.payload && (s.payload = r.payload), s.state = o, n.addTimelineEvent({
            layerId: w,
            event: {
              time: Date.now(),
              title: r.type,
              groupId: r._id,
              subtitle: "end",
              data: s
            }
          });
        }
      });
    }
  );
}
var I = 8702998, _t = 6710886, mt = 16777215, R = {
  label: "namespaced",
  textColor: mt,
  backgroundColor: _t
};
function U(e) {
  return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function H(e, t) {
  return {
    id: t || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: U(t),
    tags: e.namespaced ? [R] : [],
    children: Object.keys(e._children).map(
      function(n) {
        return H(
          e._children[n],
          t + n + "/"
        );
      }
    )
  };
}
function Q(e, t, n, r) {
  r.includes(n) && e.push({
    id: r || "root",
    label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
    tags: t.namespaced ? [R] : []
  }), Object.keys(t._children).forEach(function(o) {
    Q(e, t._children[o], n, r + o + "/");
  });
}
function gt(e, t, n) {
  t = n === "root" ? t : t[n];
  var r = Object.keys(t), o = {
    state: Object.keys(e.state).map(function(i) {
      return {
        key: i,
        editable: !0,
        value: e.state[i]
      };
    })
  };
  if (r.length) {
    var s = bt(t);
    o.getters = Object.keys(s).map(function(i) {
      return {
        key: i.endsWith("/") ? U(i) : i,
        editable: !1,
        value: S(function() {
          return s[i];
        })
      };
    });
  }
  return o;
}
function bt(e) {
  var t = {};
  return Object.keys(e).forEach(function(n) {
    var r = n.split("/");
    if (r.length > 1) {
      var o = t, s = r.pop();
      r.forEach(function(i) {
        o[i] || (o[i] = {
          _custom: {
            value: {},
            display: i,
            tooltip: "Module",
            abstract: !0
          }
        }), o = o[i]._custom.value;
      }), o[s] = S(function() {
        return e[n];
      });
    } else
      t[n] = S(function() {
        return e[n];
      });
  }), t;
}
function yt(e, t) {
  var n = t.split("/").filter(function(r) {
    return r;
  });
  return n.reduce(
    function(r, o, s) {
      var i = r[o];
      if (!i)
        throw new Error('Missing module "' + o + '" for path "' + t + '".');
      return s === n.length - 1 ? i : i._children;
    },
    t === "root" ? e : e.root._children
  );
}
function S(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var _ = function(t, n) {
  this.runtime = n, this._children = /* @__PURE__ */ Object.create(null), this._rawModule = t;
  var r = t.state;
  this.state = (typeof r == "function" ? r() : r) || {};
}, K = { namespaced: { configurable: !0 } };
K.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
_.prototype.addChild = function(t, n) {
  this._children[t] = n;
};
_.prototype.removeChild = function(t) {
  delete this._children[t];
};
_.prototype.getChild = function(t) {
  return this._children[t];
};
_.prototype.hasChild = function(t) {
  return t in this._children;
};
_.prototype.update = function(t) {
  this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters);
};
_.prototype.forEachChild = function(t) {
  m(this._children, t);
};
_.prototype.forEachGetter = function(t) {
  this._rawModule.getters && m(this._rawModule.getters, t);
};
_.prototype.forEachAction = function(t) {
  this._rawModule.actions && m(this._rawModule.actions, t);
};
_.prototype.forEachMutation = function(t) {
  this._rawModule.mutations && m(this._rawModule.mutations, t);
};
Object.defineProperties(_.prototype, K);
var g = function(t) {
  this.register([], t, !1);
};
g.prototype.get = function(t) {
  return t.reduce(function(n, r) {
    return n.getChild(r);
  }, this.root);
};
g.prototype.getNamespace = function(t) {
  var n = this.root;
  return t.reduce(function(r, o) {
    return n = n.getChild(o), r + (n.namespaced ? o + "/" : "");
  }, "");
};
g.prototype.update = function(t) {
  B([], this.root, t);
};
g.prototype.register = function(t, n, r) {
  var o = this;
  r === void 0 && (r = !0), process.env.NODE_ENV !== "production" && F(t, n);
  var s = new _(n, r);
  if (t.length === 0)
    this.root = s;
  else {
    var i = this.get(t.slice(0, -1));
    i.addChild(t[t.length - 1], s);
  }
  n.modules && m(n.modules, function(c, a) {
    o.register(t.concat(a), c, r);
  });
};
g.prototype.unregister = function(t) {
  var n = this.get(t.slice(0, -1)), r = t[t.length - 1], o = n.getChild(r);
  if (!o) {
    process.env.NODE_ENV !== "production" && console.warn(
      "[vuex] trying to unregister module '" + r + "', which is not registered"
    );
    return;
  }
  o.runtime && n.removeChild(r);
};
g.prototype.isRegistered = function(t) {
  var n = this.get(t.slice(0, -1)), r = t[t.length - 1];
  return n ? n.hasChild(r) : !1;
};
function B(e, t, n) {
  if (process.env.NODE_ENV !== "production" && F(e, n), t.update(n), n.modules)
    for (var r in n.modules) {
      if (!t.getChild(r)) {
        process.env.NODE_ENV !== "production" && console.warn(
          "[vuex] trying to add a new module '" + r + "' on hot reloading, manual reload is needed"
        );
        return;
      }
      B(
        e.concat(r),
        t.getChild(r),
        n.modules[r]
      );
    }
}
var A = {
  assert: function(e) {
    return typeof e == "function";
  },
  expected: "function"
}, Et = {
  assert: function(e) {
    return typeof e == "function" || typeof e == "object" && typeof e.handler == "function";
  },
  expected: 'function or object with "handler" function'
}, T = {
  getters: A,
  mutations: A,
  actions: Et
};
function F(e, t) {
  Object.keys(T).forEach(function(n) {
    if (t[n]) {
      var r = T[n];
      m(t[n], function(o, s) {
        v(
          r.assert(o),
          Ot(e, n, s, o, r.expected)
        );
      });
    }
  });
}
function Ot(e, t, n, r, o) {
  var s = t + " should be " + o + ' but "' + t + "." + n + '"';
  return e.length > 0 && (s += ' in module "' + e.join(".") + '"'), s += " is " + JSON.stringify(r) + ".", s;
}
function wt(e) {
  return new p(e);
}
var p = function e(t) {
  var n = this;
  t === void 0 && (t = {}), process.env.NODE_ENV !== "production" && (v(typeof Promise < "u", "vuex requires a Promise polyfill in this browser."), v(this instanceof e, "store must be called with the new operator."));
  var r = t.plugins;
  r === void 0 && (r = []);
  var o = t.strict;
  o === void 0 && (o = !1);
  var s = t.devtools;
  this._committing = !1, this._actions = /* @__PURE__ */ Object.create(null), this._actionSubscribers = [], this._mutations = /* @__PURE__ */ Object.create(null), this._wrappedGetters = /* @__PURE__ */ Object.create(null), this._modules = new g(t), this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null), this._subscribers = [], this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null), this._scope = null, this._devtools = s;
  var i = this, c = this, a = c.dispatch, l = c.commit;
  this.dispatch = function(h, d) {
    return a.call(i, h, d);
  }, this.commit = function(h, d, J) {
    return l.call(i, h, d, J);
  }, this.strict = o;
  var u = this._modules.root.state;
  O(this, u, [], this._modules.root), x(this, u), r.forEach(function(f) {
    return f(n);
  });
}, D = { state: { configurable: !0 } };
p.prototype.install = function(t, n) {
  t.provide(n || ot, this), t.config.globalProperties.$store = this;
  var r = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || !1;
  r && vt(t, this);
};
D.state.get = function() {
  return this._state.data;
};
D.state.set = function(e) {
  process.env.NODE_ENV !== "production" && v(!1, "use store.replaceState() to explicit replace store state.");
};
p.prototype.commit = function(t, n, r) {
  var o = this, s = E(t, n, r), i = s.type, c = s.payload, a = s.options, l = { type: i, payload: c }, u = this._mutations[i];
  if (!u) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown mutation type: " + i);
    return;
  }
  this._withCommit(function() {
    u.forEach(function(h) {
      h(c);
    });
  }), this._subscribers.slice().forEach(function(f) {
    return f(l, o.state);
  }), process.env.NODE_ENV !== "production" && a && a.silent && console.warn(
    "[vuex] mutation type: " + i + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
  );
};
p.prototype.dispatch = function(t, n) {
  var r = this, o = E(t, n), s = o.type, i = o.payload, c = { type: s, payload: i }, a = this._actions[s];
  if (!a) {
    process.env.NODE_ENV !== "production" && console.error("[vuex] unknown action type: " + s);
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(u) {
      return u.before;
    }).forEach(function(u) {
      return u.before(c, r.state);
    });
  } catch (u) {
    process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in before action subscribers: "), console.error(u));
  }
  var l = a.length > 1 ? Promise.all(a.map(function(u) {
    return u(i);
  })) : a[0](i);
  return new Promise(function(u, f) {
    l.then(function(h) {
      try {
        r._actionSubscribers.filter(function(d) {
          return d.after;
        }).forEach(function(d) {
          return d.after(c, r.state);
        });
      } catch (d) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in after action subscribers: "), console.error(d));
      }
      u(h);
    }, function(h) {
      try {
        r._actionSubscribers.filter(function(d) {
          return d.error;
        }).forEach(function(d) {
          return d.error(c, r.state, h);
        });
      } catch (d) {
        process.env.NODE_ENV !== "production" && (console.warn("[vuex] error in error action subscribers: "), console.error(d));
      }
      f(h);
    });
  });
};
p.prototype.subscribe = function(t, n) {
  return P(t, this._subscribers, n);
};
p.prototype.subscribeAction = function(t, n) {
  var r = typeof t == "function" ? { before: t } : t;
  return P(r, this._actionSubscribers, n);
};
p.prototype.watch = function(t, n, r) {
  var o = this;
  return process.env.NODE_ENV !== "production" && v(typeof t == "function", "store.watch only accepts a function."), L(function() {
    return t(o.state, o.getters);
  }, n, Object.assign({}, r));
};
p.prototype.replaceState = function(t) {
  var n = this;
  this._withCommit(function() {
    n._state.data = t;
  });
};
p.prototype.registerModule = function(t, n, r) {
  r === void 0 && (r = {}), typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && (v(Array.isArray(t), "module path must be a string or an Array."), v(t.length > 0, "cannot register the root module by using registerModule.")), this._modules.register(t, n), O(this, this.state, t, this._modules.get(t), r.preserveState), x(this, this.state);
};
p.prototype.unregisterModule = function(t) {
  var n = this;
  typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && v(Array.isArray(t), "module path must be a string or an Array."), this._modules.unregister(t), this._withCommit(function() {
    var r = C(n.state, t.slice(0, -1));
    delete r[t[t.length - 1]];
  }), $(this);
};
p.prototype.hasModule = function(t) {
  return typeof t == "string" && (t = [t]), process.env.NODE_ENV !== "production" && v(Array.isArray(t), "module path must be a string or an Array."), this._modules.isRegistered(t);
};
p.prototype.hotUpdate = function(t) {
  this._modules.update(t), $(this, !0);
};
p.prototype._withCommit = function(t) {
  var n = this._committing;
  this._committing = !0, t(), this._committing = n;
};
Object.defineProperties(p.prototype, D);
const V = G({
  modules: {}
}), St = (e, t) => {
  V.modules[e] = t;
}, xt = () => V.modules, Ct = () => wt(V);
export {
  xt as getStoreModules,
  Ct as getVuexStore,
  St as setStoreModule
};
