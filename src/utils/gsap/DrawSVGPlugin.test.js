const rewire = require("rewire")
const DrawSVGPlugin = rewire("./DrawSVGPlugin")
const _windowExists = DrawSVGPlugin.__get__("_windowExists")
const _getGSAP = DrawSVGPlugin.__get__("_getGSAP")
const _round = DrawSVGPlugin.__get__("_round")
const _parseNum = DrawSVGPlugin.__get__("_parseNum")
const _getAttributeAsNumber = DrawSVGPlugin.__get__("_getAttributeAsNumber")
const _getDistance = DrawSVGPlugin.__get__("_getDistance")
const _warn = DrawSVGPlugin.__get__("_warn")
const _hasNonScalingStroke = DrawSVGPlugin.__get__("_hasNonScalingStroke")
const _parse = DrawSVGPlugin.__get__("_parse")
const _getLength = DrawSVGPlugin.__get__("_getLength")
const _getPosition = DrawSVGPlugin.__get__("_getPosition")
const _initCore = DrawSVGPlugin.__get__("_initCore")
// @ponicode
describe("_windowExists", () => {
    test("0", () => {
        let callFunction = () => {
            _windowExists()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_getGSAP", () => {
    test("0", () => {
        let callFunction = () => {
            _getGSAP()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_round", () => {
    test("0", () => {
        let callFunction = () => {
            _round("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _round("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _round(-10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _round("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _round(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _round(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_parseNum", () => {
    test("0", () => {
        let callFunction = () => {
            _parseNum("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _parseNum("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _parseNum("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _parseNum(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_getAttributeAsNumber", () => {
    test("0", () => {
        let callFunction = () => {
            _getAttributeAsNumber({ getAttribute: () => 23306 }, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _getAttributeAsNumber({ getAttribute: () => "91659-4424" }, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _getAttributeAsNumber({ getAttribute: () => "73609-2040" }, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _getAttributeAsNumber({ getAttribute: () => 60144 }, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _getAttributeAsNumber({ getAttribute: () => 62562 }, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _getAttributeAsNumber(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_getDistance", () => {
    test("0", () => {
        let callFunction = () => {
            _getDistance(90, 410, 50, 550, 0.0, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _getDistance(380, 400, 70, 350, 10.0, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _getDistance(380, 4, 400, 1, 0.0, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _getDistance(1, 100, 380, 1, -29.45, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _getDistance(410, 380, 90, 70, -10, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _getDistance(undefined, -Infinity, -Infinity, -Infinity, undefined, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_warn", () => {
    test("0", () => {
        let callFunction = () => {
            _warn("New Error ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _warn("\n\nThe first error message:\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _warn("Mock Error Message")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _warn("Message recipient is not the grader, the person being graded, or the controller")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _warn("Error:")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _warn(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_hasNonScalingStroke", () => {
    test("0", () => {
        let callFunction = () => {
            _hasNonScalingStroke({ getAttribute: () => "73609-2040" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _hasNonScalingStroke({ getAttribute: () => "91659-4424" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _hasNonScalingStroke({ getAttribute: () => 62562 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _hasNonScalingStroke({ getAttribute: () => 23306 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _hasNonScalingStroke({ getAttribute: () => 60144 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _hasNonScalingStroke(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_parse", () => {
    test("0", () => {
        let callFunction = () => {
            _parse("elio@example.com", 0.0, "bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _parse("elio@example.com", 10, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _parse("%", 0, "bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _parse("Elio  Elio%Elio Dillenberg", 256, "bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _parse("Dillenberg%", 16, "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _parse(undefined, Infinity, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_getLength", () => {
    test("0", () => {
        let callFunction = () => {
            _getLength({ tagName: { toLowerCase: () => "Amazon River Dolphin" }, style: { strokeDasharray: "Extensions" }, getScreenCTM: () => "4.0.0-beta1\t", getBBox: () => 320, getTotalLength: () => 0, getAttribute: () => 60144 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _getLength({ tagName: { toLowerCase: () => "Long-finned Pilot Whale" }, style: { strokeDasharray: "Expressway" }, getScreenCTM: () => "4.0.0-beta1\t", getBBox: () => 410, getTotalLength: () => 256, getAttribute: () => 62562 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _getLength({ tagName: { toLowerCase: () => "Long-finned Pilot Whale" }, style: { strokeDasharray: "Port" }, getScreenCTM: () => "^5.0.0", getBBox: () => 50, getTotalLength: () => 16, getAttribute: () => "91659-4424" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _getLength({ tagName: { toLowerCase: () => "La Plata Dolphin" }, style: { strokeDasharray: "Lights" }, getScreenCTM: () => "^5.0.0", getBBox: () => 550, getTotalLength: () => 10, getAttribute: () => "91659-4424" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _getLength({ tagName: { toLowerCase: () => "Sei Whale" }, style: { strokeDasharray: "Extensions" }, getScreenCTM: () => "4.0.0-beta1\t", getBBox: () => 350, getTotalLength: () => 32, getAttribute: () => "91659-4424" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _getLength(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_getPosition", () => {
    test("0", () => {
        let callFunction = () => {
            _getPosition(false, ",")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _getPosition(false, " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _getPosition(false, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _getPosition(0, 256)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _getPosition(false, 64)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _getPosition(null, null)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_initCore", () => {
    test("0", () => {
        let callFunction = () => {
            _initCore()
        }
    
        expect(callFunction).not.toThrow()
    })
})
