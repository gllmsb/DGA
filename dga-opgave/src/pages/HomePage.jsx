import React from 'react'
import { HorizontalLine } from '../components/HorizoantalLine/HorizontalLine'
import { Title } from '../components/Title/Title'
import { SectionWrapper } from '../components/SectionWrapper/SectionWrapper'

export const HomePage = () => {
  return (
    <>
    <HorizontalLine />
    <SectionWrapper>
      <Title text="Udvalgte Produkter" />
    </SectionWrapper>
    </>
  )
}
