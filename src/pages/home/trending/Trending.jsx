import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import React from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'

function Trending() {
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs />
        </ContentWrapper>
    </div>
  )
}

export default Trending