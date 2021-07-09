const __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw })
    } else {
      cooked.raw = raw
    }
    return cooked
  }
exports.__esModule = true
const react_1 = require('react')
const styled_components_1 = require('styled-components')
const react_router_dom_1 = require('react-router-dom')
const core_1 = require('@web3-react/core')
const uikit_1 = require('@luckyswap/uikit')
const useI18n_1 = require('hooks/useI18n')
const useGetPublicIfoData_1 = require('hooks/useGetPublicIfoData')

const StyledIfoCard = styled_components_1.default(uikit_1.Card)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  background-image: ',
        ';\n  background-repeat: no-repeat;\n  background-size: contain;\n  padding-top: 112px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 437px;\n  width: 100%;\n',
      ],
      [
        '\n  background-image: ',
        ';\n  background-repeat: no-repeat;\n  background-size: contain;\n  padding-top: 112px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 437px;\n  width: 100%;\n',
      ],
    )),
  function (_a) {
    const { ifoId } = _a
    return `url('/images/ifos/${ifoId}-bg.svg')`
  },
)
const getRibbonComponent = function (status, TranslateString) {
  if (status === 'coming_soon') {
    return react_1.default.createElement(uikit_1.CardRibbon, {
      variantColor: 'textDisabled',
      text: TranslateString(999, 'Coming Soon'),
    })
  }
  if (status === 'live') {
    return react_1.default.createElement(uikit_1.CardRibbon, {
      variantColor: 'primary',
      text: TranslateString(999, 'LIVE NOW!'),
    })
  }
  return null
}
const IfoCard = function (_a) {
  const { ifo } = _a
  const { id } = ifo
  const { name } = ifo
  const { subTitle } = ifo
  const publicIfoData = useGetPublicIfoData_1.default(ifo)
  const { account } = core_1.useWeb3React()
  const TranslateString = useI18n_1.default()
  const Ribbon = getRibbonComponent(publicIfoData.status, TranslateString)
  return (
    // <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={publicIfoData.status === 'live'}>
    //   <IfoCardDetails ifo={ifo} publicIfoData={publicIfoData} />
    // </StyledIfoCard>
    react_1.default.createElement(
      BoxIfoCard,
      null,
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        null,
        react_1.default.createElement(
          ItemHead,
          null,
          react_1.default.createElement('section', null, react_1.default.createElement('span', null, 'Ended')),
        ),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'HyFi'),
          react_1.default.createElement('p', null, 'The Intelligent, High-frequency Yield Farming aggregator.'),
          react_1.default.createElement(
            Dflex,
            null,
            react_1.default.createElement('div', null, 'IDO Amount:'),
            react_1.default.createElement('div', null, '4,000,000 HYFI'),
          ),
          react_1.default.createElement(
            Dflex,
            { className: 'flex-bot' },
            react_1.default.createElement('div', null, 'Time:'),
            react_1.default.createElement('div', null, '6213225 (04.02 9:00 UTC)'),
          ),
          react_1.default.createElement(
            BoxLink,
            null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/IfoDetail' }, 'Participate'),
          ),
        ),
      ),
      react_1.default.createElement(
        Item,
        { className: 'item-coming' },
        react_1.default.createElement(ItemHead, null, 'Upcoming Project !'),
        react_1.default.createElement(
          ItemContent,
          null,
          react_1.default.createElement('h4', null, 'Stay tuned !'),
          react_1.default.createElement('p', null, 'Something exciting is coming your way!'),
        ),
      ),
    )
  )
}
var BoxIfoCard = styled_components_1.default.div(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\nbox-sizing: border-box;\nmin-width: 0px;\nwidth: 100%;\ndisplay: flex;\npadding: 0px;\nalign-items: center;\nflex-wrap: wrap;\nmax-width: 874px;\njustify-content: flex-start;\nmargin: auto;\n',
      ],
      [
        '\nbox-sizing: border-box;\nmin-width: 0px;\nwidth: 100%;\ndisplay: flex;\npadding: 0px;\nalign-items: center;\nflex-wrap: wrap;\nmax-width: 874px;\njustify-content: flex-start;\nmargin: auto;\n',
      ],
    )),
)
var Item = styled_components_1.default.div(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        '\nbox-sizing: border-box;\nmargin: 0px 0px 20px;\nmin-width: 0px;\npadding: 0px;\nwidth: 100%;\nmin-height: 335px;\nborder-radius: 26px;\nbackground: rgb(255, 253, 250);\noverflow: hidden;\nbox-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;\n\n@media (min-width: 768px) {\n  width: 280px;\n}\n\n&:not(:nth-child(3n)) {\n  margin-right: 0;\n\n  @media (min-width: 768px) {\n    margin-right: 17px;\n  }\n} \n',
      ],
      [
        '\nbox-sizing: border-box;\nmargin: 0px 0px 20px;\nmin-width: 0px;\npadding: 0px;\nwidth: 100%;\nmin-height: 335px;\nborder-radius: 26px;\nbackground: rgb(255, 253, 250);\noverflow: hidden;\nbox-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;\n\n@media (min-width: 768px) {\n  width: 280px;\n}\n\n&:not(:nth-child(3n)) {\n  margin-right: 0;\n\n  @media (min-width: 768px) {\n    margin-right: 17px;\n  }\n} \n',
      ],
    )),
)
var ItemHead = styled_components_1.default.div(
  templateObject_4 ||
    (templateObject_4 = __makeTemplateObject(
      [
        '\nposition: relative;\nwidth: 100%;\nheight: 106px;\nbackground-image: url(\'../images/hyfi.png\');\nbackground-size: cover;\ncolor: rgb(255, 255, 255);\n\n@media (min-width: 768px) {\n  width: 280px;\n}\n\nsection {\n  position: absolute;\n  top: 16px;\n  left: 0px;\n  background: rgb(165, 165, 165);\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n  color: rgb(255, 253, 250);\n  font-family: "Baloo Da";\n  font-weight: 400;\n  padding: 6px 12px;\n\n  span {\n    box-sizing: border-box;\n    margin: 0px;\n    min-width: 0px;\n    font-size: 12px;\n  }\n}\n',
      ],
      [
        '\nposition: relative;\nwidth: 100%;\nheight: 106px;\nbackground-image: url(\'../images/hyfi.png\');\nbackground-size: cover;\ncolor: rgb(255, 255, 255);\n\n@media (min-width: 768px) {\n  width: 280px;\n}\n\nsection {\n  position: absolute;\n  top: 16px;\n  left: 0px;\n  background: rgb(165, 165, 165);\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n  color: rgb(255, 253, 250);\n  font-family: "Baloo Da";\n  font-weight: 400;\n  padding: 6px 12px;\n\n  span {\n    box-sizing: border-box;\n    margin: 0px;\n    min-width: 0px;\n    font-size: 12px;\n  }\n}\n',
      ],
    )),
)
var Dflex = styled_components_1.default.div(
  templateObject_5 ||
    (templateObject_5 = __makeTemplateObject(
      [
        '\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding: 12px 0px 0px;\n  justify-content: space-between;\n\n  &.flex-bot {\n    padding: 4px 0px 15px;\n  }\n\ndiv {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: bold;\n  font-size: 15px;\n  color:  rgb(37 37 53);\n}\n',
      ],
      [
        '\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding: 12px 0px 0px;\n  justify-content: space-between;\n\n  &.flex-bot {\n    padding: 4px 0px 15px;\n  }\n\ndiv {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: bold;\n  font-size: 15px;\n  color:  rgb(37 37 53);\n}\n',
      ],
    )),
)
var ItemContent = styled_components_1.default.div(
  templateObject_6 ||
    (templateObject_6 = __makeTemplateObject(
      [
        '\npadding: 20px 24px 8px;\n\nh4 {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: bold;\n  font-size: 20px;\n  color:  rgb(37 37 53);\n  line-height: 28px;\n}\n\np {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: 400;\n  font-size: 14px;\n  padding: 8px 0px 0px;\n  min-height: 69px;\n  color: rgb(37 37 53);\n}\n',
      ],
      [
        '\npadding: 20px 24px 8px;\n\nh4 {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: bold;\n  font-size: 20px;\n  color:  rgb(37 37 53);\n  line-height: 28px;\n}\n\np {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  font-weight: 400;\n  font-size: 14px;\n  padding: 8px 0px 0px;\n  min-height: 69px;\n  color: rgb(37 37 53);\n}\n',
      ],
    )),
)
var BoxLink = styled_components_1.default.div(
  templateObject_7 ||
    (templateObject_7 = __makeTemplateObject(
      [
        '\na {\n  display: block;\n  width: 232px;\n  height: 40px;\n  line-height: 40px;\n  font-weight: bold;\n  font-size: 14px;\n  color: rgb(255, 253, 250);\n  text-align: center;\n  background: #f5c606;\n  border-radius: 10px;\n  text-decoration: none;\n\n  &:hover {\n    background-color: #40a9ff;\n    transition: 0.5s;\n    color: rgb(255, 253, 250);\n  }\n}\n',
      ],
      [
        '\na {\n  display: block;\n  width: 232px;\n  height: 40px;\n  line-height: 40px;\n  font-weight: bold;\n  font-size: 14px;\n  color: rgb(255, 253, 250);\n  text-align: center;\n  background: #f5c606;\n  border-radius: 10px;\n  text-decoration: none;\n\n  &:hover {\n    background-color: #40a9ff;\n    transition: 0.5s;\n    color: rgb(255, 253, 250);\n  }\n}\n',
      ],
    )),
)
exports.default = IfoCard
let templateObject_1
let templateObject_2
let templateObject_3
let templateObject_4
let templateObject_5
let templateObject_6
let templateObject_7
