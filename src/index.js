import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { toIEEE754 } from './utils';

import './index.scss';
import formula0Img from './assets/formula-0.png';
import formula1Img from './assets/formula-1.png';

class App extends Component {
  constructor() {
    super();
    this.state = { value: '0' };
    this.onChange = this.onChange.bind(this);
  }

  valid() {
    const { value } = this.state;
    return value && value !== '-' && !isNaN(Number(value));
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { value } = this.state;
    const hasValue = this.valid();
    const ieee754 = toIEEE754(Number(value));

    return (
      <div className="container">
        <div className="box">
          <input value={value} onChange={this.onChange} />
        </div>
        {hasValue && (
          <div className="cells">
            <div className="row">
              {ieee754.binaries.map((b, index) => (
                <div
                  key={index}
                  className={`cell ieee-bit-${index} ${
                    index === 0 ? 'ieee-sign cell-sign' : ''
                  } ${
                    index > 0 && index < 12 ? 'ieee-exponent cell-exponent' : ''
                  } ${index >= 12 ? 'cell-mantissa' : ''}`}
                >
                  {b}
                </div>
              ))}
            </div>
            {ieee754.isHidden && (
              <div className="row">
                <div className="cell">
                  <span className="ieee-sign">
                    {ieee754.sign > 0 && '+'}
                    {ieee754.sign}
                  </span>
                  &nbsp;&times; (<span>{2 ** ieee754.exponentNormalized}</span>
                  {ieee754.binaries.slice(12).map((b, index) =>
                    b == 1 ? (
                      <span key={index}>
                        <span>&nbsp;+&nbsp;</span>
                        <span className={`ieee-bit-${index + 12}`}>
                          {2 ** (ieee754.exponentNormalized - (index + 1))}
                        </span>
                      </span>
                    ) : null
                  )}
                  )
                </div>
              </div>
            )}
            <div className="row">
              <div className="cell">
                <span className="ieee-sign">
                  {ieee754.sign > 0 && '+'}
                  {ieee754.sign}
                </span>
                &nbsp;&times; (
                {ieee754.bHidden ? (
                  <span>
                    2<sup>{ieee754.exponentNormalized}</sup>
                  </span>
                ) : (
                  '0'
                )}
                {ieee754.binaries.slice(12).map((b, index) =>
                  b == 1 ? (
                    <span key={index}>
                      <span>&nbsp;+&nbsp;</span>
                      <span className={`ieee-bit-${index + 12}`}>
                        2<sup>{ieee754.exponentNormalized - (index + 1)}</sup>
                      </span>
                    </span>
                  ) : null
                )}
                )
              </div>
            </div>
            <div className="row">
              <div className="cell">
                <span className="ieee-sign">
                  -1<sup>{ieee754.bSign}</sup>
                </span>
                &nbsp;&times;&nbsp;
                <span className="ieee-exponent">
                  2<sup>{ieee754.exponentNormalized}</sup>
                </span>
                &nbsp;&times;&nbsp;(
                {ieee754.bHidden ? (
                  <span>
                    2<sup>0</sup>
                  </span>
                ) : (
                  '0'
                )}
                {ieee754.binaries.slice(12).map((b, index) =>
                  b == 1 ? (
                    <span key={index}>
                      <span>&nbsp;+&nbsp;</span>
                      <span className={`ieee-bit-${index + 12}`}>
                        2<sup>-{index + 1}</sup>
                      </span>
                    </span>
                  ) : null
                )}
                )
              </div>
            </div>
            <div className="row">
              <div className="cell">
                <span className="ieee-sign">
                  -1<sup>{ieee754.bSign}</sup>
                </span>
                &nbsp;&times;&nbsp;
                <span className="ieee-exponent">
                  2<sup>{ieee754.exponent} - 1023</sup>
                </span>
                &nbsp;&times;&nbsp;({ieee754.bHidden}
                {ieee754.binaries.slice(12).map((b, index) =>
                  b == 1 ? (
                    <span key={index}>
                      <span>&nbsp;+&nbsp;</span>
                      <span className={`ieee-bit-${index + 12}`}>
                        2<sup>-{index + 1}</sup>
                      </span>
                    </span>
                  ) : null
                )}
                )
              </div>
            </div>
            <div className="row">
              <div className="cell">
                Formula: n ={' '}
                <img
                  className="formula"
                  src={ieee754.bHidden ? formula1Img : formula0Img}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
