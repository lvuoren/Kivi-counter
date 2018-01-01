import React from 'react'
import {connect} from 'react-redux'
import {Button, TouchableHighlight, View} from 'react-native'

import {selectUser, toggleSquare, closeRound} from '../actions'
import Rounds from './rounds'

import {
  Board,
  BodyText,
  Container,
  Cross,
  Header,
  Row,
  Black,
  White,
  Red,
  SpaceAroundRow,
  Scroll,
  ScrollContainer
} from './style'
import {PTS, BoardModel} from '../reducer/board-model'

export const MainView = ({
  selectActiveUser,
  toggleActiveSquare,
  closeActiveRound,
  activeUser,
  selections,
  points,
  rounds
}) => {
  const selectUser1 = () => selectActiveUser(1)
  const selectUser2 = () => selectActiveUser(2)
  const selectUser3 = () => selectActiveUser(3)
  const selectUser4 = () => selectActiveUser(4)

  const SquareType = (square, rowIndex, squareIndex) => {
    const onSquarePress = () => toggleActiveSquare(rowIndex, squareIndex)
    let color = <White />
    if (square === PTS.BK) {
      color = <Black key={squareIndex} />
    }
    if (square === PTS.RD) {
      color = <Red key={squareIndex} />
    }
    const player = selections[rowIndex][squareIndex]
    return (
      <TouchableHighlight onPress={onSquarePress} key={squareIndex}>
        <View>
          {color}
          {player && <Cross player={player}>{player}</Cross>}
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <Container>
      <Header>Kivi Scores</Header>
      <Scroll>
        <ScrollContainer>
          <Board>
            {BoardModel.map((row, index) => (
              <Row key={index}>
                {row.map((square, squareIndex) => SquareType(square, index, squareIndex))}
              </Row>
            ))}
          </Board>
          <BodyText>Selection: Player {activeUser}</BodyText>
          <SpaceAroundRow>
            <View>
              <Button title="Player 1" onPress={selectUser1} />
              <BodyText player={1}>{points[1]}</BodyText>
            </View>
            <View>
              <Button title="Player 2" onPress={selectUser2} />
              <BodyText player={2}>{points[2]}</BodyText>
            </View>
            <View>
              <Button title="Player 3" onPress={selectUser3} />
              <BodyText player={3}>{points[3]}</BodyText>
            </View>
            <View>
              <Button title="Player 4" onPress={selectUser4} />
              <BodyText player={4}>{points[4]}</BodyText>
            </View>
          </SpaceAroundRow>
          <Button title="Close round" onPress={closeActiveRound} />
          <Rounds rounds={rounds} />
        </ScrollContainer>
      </Scroll>
    </Container>
  )
}

const mapStateToProps = ({activeUser, selections, points, rounds}) => ({
  activeUser,
  selections,
  points,
  rounds
})

const mapDispatchToProps = dispatch => ({
  selectActiveUser: number => dispatch(selectUser(number)),
  toggleActiveSquare: (row, square) => dispatch(toggleSquare({row, square})),
  closeActiveRound: () => dispatch(closeRound())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
