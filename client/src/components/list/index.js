import React, { Component } from 'react';

import './styles.css';

/*
 * @param grid
 * @param dataSource
 * @param render
 */
export default class List extends Component {
    render() {
        const { space, column } = this.props.grid;
        const dataSize = this.props.dataSource.length;
        const numRow = Math.ceil(dataSize / column);
        const width = (100 - space * (column - 1)) / column; /* percent width */
        // console.log(numRow, column);
        return (
            <div className="list-container col-h-center">
                {/* for each row */}
                {Array.from(Array(numRow).keys()).map((row_index) => (
                    <div key={row_index} className="list-row row-v-center">
                        {/* for each column */}
                        {Array.from(
                            { length: column },
                            (_, i) => i + row_index * column
                        )
                            .filter((i) => i < dataSize)
                            .map((item_index) => (
                                <div
                                    key={item_index}
                                    className="list-item"
                                    style={{
                                        width: `${width}%`,
                                        marginRight:
                                            (item_index + 1) % column === 0
                                                ? '0'
                                                : `${space}%`,
                                    }}>
                                    {this.props.renderItem(
                                        this.props.dataSource[item_index]
                                    )}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        );
    }
}
