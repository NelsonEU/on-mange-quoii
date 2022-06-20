

import React, { Component } from 'react';
import Color from 'color-thief-react'

class ShuffledRecipe extends Component {
  constructor(props) {
    super(props);
    this._formatIngredients = this._formatIngredients.bind(this);
    this._capitalize = this._capitalize.bind(this);
    console.log(props.picture);
    this.state = {
      recipeClassName: `${props.position}Recipe recipe`,
      imgClassName: `${props.position}Img recipeImg`,
      titleClassName: `${props.position}RecipeTitle recipeTitle`,
      truncatedDescription: props.picture.strInstructions.length > 500 ? props.picture.strInstructions.slice(0, 500)+ '...' : props.picture.strInstructions,
      ingredients: [],
      shortIngredientLists: []
    };
  }

  componentDidMount() {
    this._formatIngredients();
  }

  render() {
    return (
      <Color src={this.props.picture.strMealThumb} crossOrigin="anonymous" format="hex">
        {({ data, loading, error }) => {
          return (
          <div className={this.state.recipeClassName} recipe style={{ backgroundColor: data }}>
            <h1 className={this.state.titleClassName}>{this.props.picture.strMeal} </h1>
            <img className={this.state.imgClassName} src={this.props.picture.strMealThumb} />
          </div>
        )}}
      </Color>
    )
  }

  _formatIngredients() {
    let ingredients = Object.keys(this.props.picture)
      .filter((i) => i.includes('Ingredient'))
      .map((i) => this._capitalize(this.props.picture[i]))
      .filter(i => i);

    this.setState({
      ingredients: ingredients,
      shortIngredientLists: ingredients.length > 3 ? ingredients.slice(0, 3).concat('And more...') : ingredients
    });
  }

  _capitalize(string) {
    if (!string) return '';

    return string[0].toUpperCase() + string.substring(1).toLowerCase();
  }
}

export default ShuffledRecipe;
