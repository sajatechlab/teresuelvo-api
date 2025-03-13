"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtEntity = exports.DebtRange = exports.DebtType = void 0;
var DebtType;
(function (DebtType) {
    DebtType["CREDIT_CARD"] = "CREDIT_CARD";
    DebtType["PERSONAL_LOAN"] = "PERSONAL_LOAN";
    DebtType["COMPANY"] = "COMPANY";
    DebtType["OTHER"] = "OTHER";
})(DebtType || (exports.DebtType = DebtType = {}));
var DebtRange;
(function (DebtRange) {
    DebtRange["Range1"] = "5.000.000-10.000.000";
    DebtRange["Range2"] = "10.000.000-20.000.000";
    DebtRange["Range3"] = "20.000.000-50.000.000";
    DebtRange["Range4"] = "50.000.000-100.000.000";
    DebtRange["Range5"] = "+100.000.000";
})(DebtRange || (exports.DebtRange = DebtRange = {}));
var DebtEntity;
(function (DebtEntity) {
    DebtEntity["BANCOLOMBIA"] = "BANCOLOMBIA";
    DebtEntity["BANCO_PICHINCHA"] = "BANCO_PICHINCHA";
    DebtEntity["BANCO_AV_VILLAS"] = "BANCO_AV_VILLAS";
    DebtEntity["BANCO_POPULAR"] = "BANCO_POPULAR";
    DebtEntity["BANCO_OCCIDENTE"] = "BANCO_OCCIDENTE";
    DebtEntity["BANCO_AGRARIO"] = "BANCO_AGRARIO";
    DebtEntity["BANCO_DE_BOGOTA"] = "BANCO_DE_BOGOTA";
    DebtEntity["BANCO_DE_OCCIDENTE"] = "BANCO_DE_OCCIDENTE";
    DebtEntity["BANCO_DE_POPULAR"] = "BANCO_DE_POPULAR";
    DebtEntity["BANCO_FALABELLA"] = "BANCO_FALABELLA";
    DebtEntity["BANCO_SANTANDER"] = "BANCO_SANTANDER";
    DebtEntity["BANCO_SCOTIABANK"] = "BANCO_SCOTIABANK";
    DebtEntity["OTHER"] = "OTHER";
})(DebtEntity || (exports.DebtEntity = DebtEntity = {}));
//# sourceMappingURL=type.enum.js.map