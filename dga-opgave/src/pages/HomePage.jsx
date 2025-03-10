import React from 'react'
import { HorizontalLine } from '../components/HorizoantalLine/HorizontalLine'
import { Title } from '../components/Title/Title'
import { SectionWrapper } from '../components/SectionWrapper/SectionWrapper'
import { RandomProducts } from '../components/RandomProducts/RandomProducts'
import { Banner } from '../components/Banner/Banner'

export const HomePage = () => {
  return (
    <>
    <HorizontalLine />
    <SectionWrapper>
      <Title text="Udvalgte Produkter" />
      <RandomProducts />
    </SectionWrapper>
    <HorizontalLine />
    <SectionWrapper>
      <Banner />
    </SectionWrapper>
    <HorizontalLine />
    </>
  )
}
