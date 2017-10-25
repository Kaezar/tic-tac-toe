import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
function Reset(props) {
    return (
        <button onClick={props.onClick}>
            Reset
        </button>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        // if board is dead or the square already has an x in it
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // put an x in the square, update state and set next player
        squares[i] = 'X';
        this.setState({
            squares: squares
        });
        this.props.changeNext();
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    renderReset() {
        return (
            <Reset
                onClick ={() => this.handleReset()}
            />
        );
    }
    handleReset() {
        this.setState({
            squares: Array(9).fill(null)
        });
        this.props.resetNext();
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Player ' + (this.props.xIsNext ? '1' : '2') + ' wins!';
        } else {
            status = 'Player ' + (this.props.xIsNext ? '1' : '2') + '\'s turn';
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div>
                    {this.renderReset()}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            xIsNext: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);

    }
    handleChange() {
        this.setState({
            xIsNext : !this.state.xIsNext
        });
    }
    handleNext() {
        this.setState({
            xIsNext: true
        });
    }
    render() {
        return (
            <div className="game">
                <div>
                    <Board
                        xIsNext={this.state.xIsNext}
                        changeNext={this.handleChange}
                        resetNext={this.handleNext}
                    />
                </div>
                <div>
                    <Board
                        xIsNext={this.state.xIsNext}
                        changeNext={this.handleChange}
                        resetNext={this.handleNext}
                    />
                </div>
                <div>
                    <Board
                        xIsNext={this.state.xIsNext}
                        changeNext={this.handleChange}
                        resetNext={this.handleNext}
                    />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return true;
        }
    }
    return null;
}
function App() {
    return (
        <div>
            <h1>Reverse Three-Board Double-X Tic-Tac-Toe!</h1>
            <Game />
        </div>
    );
}