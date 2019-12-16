import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { BigNumber } from '@uniswap/sdk'
import styled from 'styled-components'
import Card from '../components/Card'
import Loader from '../components/Loader'
import PoolUnit from '../components/PoolUnit'
import { Link } from '../components/Link'
import { useAllBalances } from '../contexts/Balances'
import { useAllTokenDetails } from '../contexts/Tokens'
import { useWeb3React } from '../hooks'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-top: 3rem;
  }
`

const FormattedCard = styled(Card)`
  display: grid;
  row-gap: 30px;
`

const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 500;
`

const SubText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.disabledText};
`

const Bold = styled.span`
  font-weight: 500;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`

const PoolGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    margin-top: 1rem;
  }
`

function Migrate() {
  const { account } = useWeb3React()

  const allBalances = useAllBalances()

  const allTokenDetails = useAllTokenDetails()

  const [userPools, setUserPools] = useState([
    {
      token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      balance: 2,
      exchangeAddress: '0x4FF7Fa493559c40aBd6D157a0bfC35Df68d8D0aC'
    },
    {
      token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      balance: 2,
      exchangeAddress: '0x4FF7Fa493559c40aBd6D157a0bfC35Df68d8D0aC'
    },
    {
      token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      balance: 2,
      exchangeAddress: '0x4FF7Fa493559c40aBd6D157a0bfC35Df68d8D0aC'
    }
  ])

  useEffect(() => {
    // if (Object.keys(allBalances).length > 0) {
    //   let newUserPools = []
    //   Object.keys(allTokenDetails).map(tokenAddress => {
    //     let exchangeAddress = allTokenDetails[tokenAddress].exchangeAddress
    //     if (allBalances[exchangeAddress] && allBalances[exchangeAddress][account]) {
    //       const balanceBigNumber = new BigNumber(allBalances[exchangeAddress][account].value.toString()).div(
    //         new BigNumber(10).pow(allTokenDetails[tokenAddress].decimals)
    //       )
    //       if (!balanceBigNumber.isZero()) {
    //         let userPool = {
    //           token: tokenAddress,
    //           exchangeAddress: exchangeAddress,
    //           balance: balanceBigNumber.toFixed(5)
    //         }
    //         newUserPools.push(userPool)
    //       }
    //     }
    //   })
    //   setUserPools(newUserPools)
    // }
  }, [allBalances, account, allTokenDetails])

  return (
    <Wrapper>
      <FormattedCard variant="pinkOutlined">
        <HeaderText>Migrate To Uniswap V2</HeaderText>
        <div>
          <Bold>Uniswap contracts have been upgraded. </Bold>
          Your liquidity will need to be migrated to participate in the V2 liquidity pools.
        </div>
        <Link href="">Read more about this upgrade and what it means for Uniswap.</Link>
      </FormattedCard>
      <div>
        <Row>
          <HeaderText>Your Liquidity</HeaderText>
          <SubText>{userPools && userPools.length ? userPools.length + ' pools found' : ''}</SubText>
        </Row>
        {userPools ? (
          <PoolGrid>
            {userPools.map((userPool, i) => (
              <PoolUnit userPool={userPool} key={i} />
            ))}
          </PoolGrid>
        ) : (
          <Row>
            <Loader />
          </Row>
        )}
      </div>
    </Wrapper>
  )
}

export default withRouter(Migrate)
