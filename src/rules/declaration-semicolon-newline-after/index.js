import {
  ruleMessages,
  whitespaceChecker
} from "../../utils"

export const ruleName = "declaration-semicolon-newline-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected newline after ";"`,
  rejectedAfter: () => `Unexpected newline after ";"`,
  expectedAfterMultiLine: () => `Expected newline after ";" within multi-line declaration block`,
  rejectedAfterMultiLine: () => `Unexpected newline after ";" within multi-line declaration block`,
})

/**
 * @param {"always"|"never"|"always-multi-line"|"never-multi-line"} expectation
 */
export default function (expectation) {
  const check = whitespaceChecker("\n", expectation, messages)
  return function (css, result) {
    css.eachDecl(function (decl) {
      const nextDecl = decl.next()
      if (!nextDecl) { return }
      check.after(nextDecl.toString(), -1, m => {
        return result.warn(m, { node: decl })
      }, decl.parent.toString().slice("{"))
    })
  }
}
