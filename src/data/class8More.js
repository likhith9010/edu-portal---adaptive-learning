function topic(id, topicName, level, prompt, fallbackHint) {
  return { id, topic: topicName, level, prompt, fallbackHint };
}

function item(id, level, prompt, options, answer) {
  return { id, level, prompt, options, answer };
}

export const CLASS8_EXTRA = {
  'm8-1': {
    solve: [
      topic('m81x1', 'Equivalent fractions', 'Easy', 'Why are 2/3 and 4/6 the same rational number?', 'Multiply the numerator and denominator of 2/3 by 2.'),
      topic('m81x2', 'Placing 3/4', 'Easy', 'How do you mark 3/4 on the number line?', 'Split the unit from 0 to 1 into four equal parts and take the third mark.'),
      topic('m81x3', 'Closure under subtraction', 'Easy', 'Are rational numbers closed under subtraction?', 'The difference of two rationals is always another rational.'),
      topic('m81x4', 'Associative addition', 'Medium', 'Check that (1/2 + 1/3) + 1/6 equals 1/2 + (1/3 + 1/6).', 'Both sides equal 1. Addition of rationals is associative.'),
      topic('m81x5', 'Division is not commutative', 'Medium', 'Show that division is not commutative using 1/2 and 1/4.', '1/2 divided by 1/4 is 2. 1/4 divided by 1/2 is 1/2.'),
      topic('m81x6', 'Standard form of 36/-48', 'Medium', 'Write 36/-48 in standard form.', 'Move the sign to the numerator, then divide by 12. The result is -3/4.'),
      topic('m81x7', 'No reciprocal for zero', 'Medium', 'Why does 0 have no reciprocal?', 'No rational r satisfies 0 x r = 1.'),
      topic('m81x8', 'Sign of a reciprocal', 'Easy', 'The reciprocal of a negative rational is negative. Give the reciprocal of -5/8.', '-8/5.'),
      topic('m81x9', 'Three numbers between 1/5 and 1/4', 'Hard', 'Find three rationals between 1/5 and 1/4.', 'Use denominator 80. 1/5 = 16/80 and 1/4 = 20/80, so 17/80, 18/80 and 19/80 work.'),
      topic('m81x10', 'Between two negatives', 'Hard', 'Name a rational between -2/5 and -1/5.', '-2/5 = -8/20 and -1/5 = -4/20, so -7/20 lies between them.'),
      topic('m81x11', 'Distributive evaluation', 'Hard', 'Evaluate (3/5) x (10/9 + 5/6) using distributivity.', 'Split into 2/3 + 1/2. The sum is 7/6.'),
      topic('m81x12', 'Identity check', 'Easy', 'What is a + 0 and a x 1 for a rational a?', 'Both results are a. Zero is the additive identity and 1 is the multiplicative identity.')
    ],
    test: [
      item('m81x-t1', 'Easy', '2/3 is equal to', ['3/2', '4/6', '2/6', '5/3'], '4/6'),
      item('m81x-t2', 'Easy', 'Rational numbers are closed under subtraction. That means the difference is', ['Always zero', 'Always another rational', 'Never rational', 'Always a whole number'], 'Always another rational'),
      item('m81x-t3', 'Medium', 'The standard form of 36/-48 is', ['-36/48', '-3/4', '3/4', '-6/8'], '-3/4'),
      item('m81x-t4', 'Medium', 'The reciprocal of -5/8 is', ['5/8', '-5/8', '-8/5', '8/5'], '-8/5'),
      item('m81x-t5', 'Medium', '(3/5) x (10/9) equals', ['2/3', '30/45 only, not simplifiable', '6/5', '1/3'], '2/3'),
      item('m81x-t6', 'Hard', '1/2 divided by 1/4 equals', ['1/8', '1/2', '2', '4'], '2'),
      item('m81x-t7', 'Hard', '(3/5) x (10/9 + 5/6) equals', ['1/2', '7/6', '2/3', '5/6'], '7/6'),
      item('m81x-t8', 'Hard', 'Which number lies between -2/5 and -1/5?', ['-1/2', '-7/20', '-1/10', '0'], '-7/20'),
      item('m81x-t9', 'Hard', 'Which list lies between 1/5 and 1/4?', ['17/80, 18/80, 19/80', '1/6, 1/7, 1/8', '1/3, 1/2, 1', '8/40, 10/40, 12/40'], '17/80, 18/80, 19/80')
    ]
  },
  'm8-2': {
    solve: [
      topic('m82x1', 'What stays linear', 'Easy', 'Why is 2x + 3 = 11 linear, while x squared = 9 is not?', 'A linear equation uses the variable only to the power 1.'),
      topic('m82x2', 'Same step both sides', 'Easy', 'Name one move you may make to both sides of an equation.', 'Add, subtract, multiply, or divide by the same non-zero number.'),
      topic('m82x3', 'Check x = 5', 'Easy', 'Check that x = 5 solves 5x - 7 = 2x + 8.', 'Left side: 25 - 7 = 18. Right side: 10 + 8 = 18.'),
      topic('m82x4', 'Clear then expand', 'Medium', 'After multiplying (x + 1)/2 = (x - 2)/3 by 6, what equation do you get?', '3(x + 1) = 2(x - 2).'),
      topic('m82x5', 'A negative root', 'Medium', 'Why is x = -7 an acceptable solution of (x + 1)/2 = (x - 2)/3?', 'Both sides equal -3 when you substitute it.'),
      topic('m82x6', 'Consecutive even numbers', 'Medium', 'If the integers were consecutive even numbers, how would the three expressions change?', 'Use n, n + 2 and n + 4 instead of n, n + 1 and n + 2.'),
      topic('m82x7', 'Age check', 'Medium', 'Check the ages 16 and 20 against the worksheet age problem.', '20 is 4 more than 16, and 16 + 20 = 36.'),
      topic('m82x8', 'Tens place value', 'Hard', 'Why is a two-digit number with tens digit a and units digit b equal to 10a + b?', 'The tens digit is worth ten times its face value.'),
      topic('m82x9', 'Digit equation', 'Hard', 'In the digit problem, the number is 11a - 3 and it equals 7 times the digit sum. Write that equation.', '11a - 3 = 7(2a - 3).'),
      topic('m82x10', 'Fraction equation', 'Hard', 'Solve (2x - 3)/4 - (x + 1)/3 = 1 far enough to name the LCM you use.', 'The LCM of 4 and 3 is 12. Multiply every term by 12.'),
      topic('m82x11', 'Leave a fraction', 'Easy', 'When is it correct to leave the solution as a fraction?', 'When it does not simplify to an integer, as with x = 25/2.'),
      topic('m82x12', 'Never divide by zero', 'Easy', 'Why must you not divide both sides by zero?', 'Division by zero is not defined, so the equality is not a valid step.')
    ],
    test: [
      item('m82x-t1', 'Easy', 'You may add the same number to both sides because', ['It changes the root', 'The two sides stay equal', 'It removes the variable', 'It is the same as dividing by zero'], 'The two sides stay equal'),
      item('m82x-t2', 'Easy', 'x = 5 checks in 5x - 7 = 2x + 8 because both sides equal', ['5', '13', '18', '25'], '18'),
      item('m82x-t3', 'Medium', 'Multiplying (x + 1)/2 = (x - 2)/3 by 6 gives', ['x + 1 = x - 2', '3(x + 1) = 2(x - 2)', '6x = 1', '2(x + 1) = 3(x - 2)'], '3(x + 1) = 2(x - 2)'),
      item('m82x-t4', 'Medium', 'Three consecutive even integers would be written', ['n, n + 1, n + 2', 'n, n + 2, n + 4', 'n, 2n, 3n', 'n - 1, n, n + 1 only'], 'n, n + 2, n + 4'),
      item('m82x-t5', 'Medium', 'The number with tens digit a and units digit a - 3 is', ['a + (a - 3)', '11a - 3', '10(a - 3) + a', 'a(a - 3)'], '11a - 3'),
      item('m82x-t6', 'Hard', '11a - 3 = 7(2a - 3) simplifies to', ['a = 3', 'a = 6', 'a = 9', 'a = 7'], 'a = 6'),
      item('m82x-t7', 'Hard', 'The LCM used for (2x - 3)/4 - (x + 1)/3 = 1 is', ['7', '12', '4', '1'], '12'),
      item('m82x-t8', 'Hard', 'Substituting x = -7 into (x + 1)/2 gives', ['-3', '3', '-7', '0'], '-3'),
      item('m82x-t9', 'Hard', 'A solution such as 25/2 should be', ['Rounded to 12', 'Left as a fraction', 'Rejected because it is not a whole number', 'Replaced by 0'], 'Left as a fraction')
    ]
  },
  'm8-3': {
    solve: [
      topic('m83x1', 'Polygon names', 'Easy', 'How many sides do a pentagon and a hexagon have?', 'A pentagon has 5 sides and a hexagon has 6.'),
      topic('m83x2', 'Diagonals of a quadrilateral', 'Easy', 'How many diagonals does a quadrilateral have?', 'Two.'),
      topic('m83x3', 'Convex polygon', 'Easy', 'When is a polygon convex?', 'Every interior angle is less than 180 degrees, and a segment joining two points of it stays inside.'),
      topic('m83x4', 'Pentagon angle sum', 'Medium', 'Find the interior angle sum of a pentagon.', '(5 - 2) x 180 = 540 degrees.'),
      topic('m83x5', 'Regular pentagon angle', 'Medium', 'Each interior angle of a regular pentagon is 108 degrees. How do you get that?', '540 divided by 5.'),
      topic('m83x6', 'Exterior and interior', 'Medium', 'An exterior angle and the interior angle at the same vertex add to what?', '180 degrees, because they lie on a straight line.'),
      topic('m83x7', 'Rectangle diagonals', 'Medium', 'What extra fact is true of the diagonals of a rectangle?', 'They are equal, as well as bisecting each other.'),
      topic('m83x8', 'Rhombus diagonals', 'Hard', 'State two facts about the diagonals of a rhombus.', 'They bisect each other at right angles, and they bisect the vertex angles.'),
      topic('m83x9', 'Kite', 'Hard', 'What is true of the diagonals of a kite?', 'They meet at right angles, and one diagonal is a line of symmetry.'),
      topic('m83x10', 'Isosceles trapezium', 'Hard', 'What is special about an isosceles trapezium in this chapter?', 'The non-parallel sides are equal, and the base angles are equal.'),
      topic('m83x11', 'From interior to sides', 'Hard', 'If you are given an interior angle of a regular polygon, how do you find the number of sides?', 'Subtract it from 180 to get the exterior angle, then divide 360 by that exterior angle.'),
      topic('m83x12', 'Square inside the family', 'Easy', 'Why is every square both a rectangle and a rhombus?', 'It has right angles, so it is a rectangle, and equal sides, so it is a rhombus.')
    ],
    test: [
      item('m83x-t1', 'Easy', 'A pentagon has', ['4 sides', '5 sides', '6 sides', '8 sides'], '5 sides'),
      item('m83x-t2', 'Easy', 'A quadrilateral has', ['1 diagonal', '2 diagonals', '4 diagonals', '5 diagonals'], '2 diagonals'),
      item('m83x-t3', 'Medium', 'The interior angle sum of a pentagon is', ['360 degrees', '540 degrees', '720 degrees', '180 degrees'], '540 degrees'),
      item('m83x-t4', 'Medium', 'Each interior angle of a regular pentagon is', ['90 degrees', '108 degrees', '120 degrees', '135 degrees'], '108 degrees'),
      item('m83x-t5', 'Medium', 'An interior angle and the exterior angle at the same vertex add to', ['90 degrees', '180 degrees', '360 degrees', '540 degrees'], '180 degrees'),
      item('m83x-t6', 'Hard', 'The diagonals of a rectangle are', ['Unequal', 'Equal', 'Always perpendicular only in a square', 'Outside the shape'], 'Equal'),
      item('m83x-t7', 'Hard', 'The diagonals of a rhombus', ['Are always equal', 'Meet at right angles', 'Never bisect each other', 'Are sides of the rhombus'], 'Meet at right angles'),
      item('m83x-t8', 'Hard', 'A regular polygon with each interior angle 156 degrees has exterior angle', ['24 degrees', '36 degrees', '90 degrees', '156 degrees'], '24 degrees'),
      item('m83x-t9', 'Hard', 'An isosceles trapezium has', ['Both pairs of sides parallel', 'Equal non-parallel sides', 'All angles equal to 90 degrees', 'No parallel sides'], 'Equal non-parallel sides')
    ]
  },
  'm8-4': {
    solve: [
      topic('m84x1', 'Raw data', 'Easy', 'What is raw data in this chapter?', 'A list of observations before they are grouped or counted.'),
      topic('m84x2', 'Class width', 'Easy', 'The class 10-20, when 20 is not included, has what width?', '10.'),
      topic('m84x3', 'Total frequency check', 'Easy', 'The height frequencies are 3, 7, 6 and 4. Why should they add to 20?', 'There are 20 students, so the frequencies must account for every student.'),
      topic('m84x4', 'Bar graph gaps', 'Medium', 'Why does a bar graph of favourite sports keep gaps between bars?', 'The sports are separate categories, not a continuous scale.'),
      topic('m84x5', 'One third of a pie', 'Medium', 'What central angle is one third of the data?', '120 degrees.'),
      topic('m84x6', 'School hours', 'Medium', 'School is 7 hours of a 24-hour day. What is its central angle?', '(7/24) x 360 = 105 degrees.'),
      topic('m84x7', 'Study and other', 'Medium', 'Find the sector angles for 4 hours of study and 2 hours of other activity.', 'Study is 60 degrees. Other is 30 degrees.'),
      topic('m84x8', 'Angle sum check', 'Hard', 'The day chart uses 120, 105, 45, 60 and 30 degrees. What must those angles add to, and do they?', 'They must add to 360. 120 + 105 + 45 + 60 + 30 = 360.'),
      topic('m84x9', 'Coin outcomes', 'Easy', 'What is the sample space of a fair coin?', 'Heads and tails.'),
      topic('m84x10', 'Certain and impossible', 'Hard', 'Give one certain event and one impossible event for a standard die.', 'A number less than 7 is certain. A 7 is impossible.'),
      topic('m84x11', 'Probability bounds', 'Hard', 'What does an answer below 0 or above 1 tell you about a probability fraction?', 'The fraction was set up the wrong way. A probability stays between 0 and 1.'),
      topic('m84x12', 'Recovering a count', 'Hard', 'Write the rearrangement that turns a central angle and a total into a frequency.', 'Frequency = (central angle / 360) x total.')
    ],
    test: [
      item('m84x-t1', 'Easy', 'The width of the class 10-20 in the worksheet is', ['5', '10', '20', '30'], '10'),
      item('m84x-t2', 'Easy', 'The height frequencies 3, 7, 6 and 4 add to', ['16', '20', '24', '7'], '20'),
      item('m84x-t3', 'Medium', 'A bar graph of favourite sports has gaps because', ['The data is continuous', 'The categories are separate', 'Pie charts use gaps', 'The scale is 360 degrees'], 'The categories are separate'),
      item('m84x-t4', 'Medium', 'One third of a pie chart has central angle', ['90 degrees', '120 degrees', '180 degrees', '60 degrees'], '120 degrees'),
      item('m84x-t5', 'Medium', '7 hours of school in a 24-hour day has central angle', ['70 degrees', '90 degrees', '105 degrees', '120 degrees'], '105 degrees'),
      item('m84x-t6', 'Hard', '4 hours of study in the day chart has central angle', ['30 degrees', '45 degrees', '60 degrees', '90 degrees'], '60 degrees'),
      item('m84x-t7', 'Hard', 'The sample space of a fair coin is', ['1 and 2', 'Heads and tails', '0 and 1', 'Six faces'], 'Heads and tails'),
      item('m84x-t8', 'Hard', 'Rolling a number less than 7 on a standard die has probability', ['0', '1/6', '1/2', '1'], '1'),
      item('m84x-t9', 'Hard', 'A probability of 1.3 means', ['The event is certain', 'The fraction was set up the wrong way', 'The event is impossible', 'The die has 13 faces'], 'The fraction was set up the wrong way')
    ]
  },
  'm8-5': {
    solve: [
      topic('m85x1', 'First square numbers', 'Easy', 'List the square numbers from 1 squared through 10 squared.', '1, 4, 9, 16, 25, 36, 49, 64, 81, 100.'),
      topic('m85x2', 'Even and odd squares', 'Easy', 'The square of an even number is even. What about the square of an odd number?', 'It is odd.'),
      topic('m85x3', 'Ends with 5', 'Easy', 'If a number ends with 5, what do the last two digits of its square have to be?', '25.'),
      topic('m85x4', 'Units pairs', 'Medium', 'Which units digits produce a square ending in 6?', '4 and 6.'),
      topic('m85x5', 'Between 4 and 9', 'Medium', 'Name the non-squares between 4 and 9, and say why there are four of them.', '5, 6, 7 and 8. Between n squared and the next square there are 2n non-squares, and here n = 2.'),
      topic('m85x6', 'Triplet for m = 2', 'Medium', 'Write the Pythagorean triplet for m = 2 and check it.', '4, 3 and 5. 9 + 16 = 25.'),
      topic('m85x7', 'Scaled triplet', 'Medium', 'Why is 6, 8, 10 also a Pythagorean triplet?', 'It is 3, 4, 5 multiplied by 2. Any positive multiple of a triplet is a triplet.'),
      topic('m85x8', 'Square root of 2500', 'Hard', 'Why can 2500 be a square, and what is its square root?', 'It ends in two zeros, an even count. 50 squared = 2500.'),
      topic('m85x9', 'Square root of 1225', 'Hard', '1225 ends in 25. What is its square root?', '35, because 35 x 35 = 1225.'),
      topic('m85x10', 'Decimal root of 2', 'Hard', 'The division method on 2 does not finish with remainder 0. What does the chapter say the root begins with?', '1.414, and you stop at the number of decimal places asked for.'),
      topic('m85x11', 'Odd member of a triplet', 'Hard', 'If the given member is odd, which two formula parts is it usually?', 'm squared minus 1, or m squared plus 1. Those two differ by 2.'),
      topic('m85x12', 'Reject before you calculate', 'Easy', 'What should you check before factoring a claimed square?', 'The units digit. A square cannot end in 2, 3, 7 or 8.')
    ],
    test: [
      item('m85x-t1', 'Easy', 'The square of an odd number is', ['Even', 'Odd', 'Always ending in 0', 'Always 1'], 'Odd'),
      item('m85x-t2', 'Easy', 'A number ending in 5 has a square ending in', ['5', '10', '15', '25'], '25'),
      item('m85x-t3', 'Medium', 'The non-squares between 4 and 9 are', ['3, 4, 5', '5, 6, 7, 8', '4, 5, 6, 7', '6, 7, 8, 9'], '5, 6, 7, 8'),
      item('m85x-t4', 'Medium', 'The triplet for m = 2 is', ['2, 3, 4', '3, 4, 5', '4, 5, 6', '5, 12, 13'], '3, 4, 5'),
      item('m85x-t5', 'Medium', '6, 8, 10 is a triplet because it is', ['A prime triple', '3, 4, 5 multiplied by 2', 'The powers of 2', 'Not related to 3, 4, 5'], '3, 4, 5 multiplied by 2'),
      item('m85x-t6', 'Hard', 'The square root of 2500 is', ['25', '50', '250', '500'], '50'),
      item('m85x-t7', 'Hard', 'The square root of 1225 is', ['25', '35', '45', '55'], '35'),
      item('m85x-t8', 'Hard', 'A units digit of 4 or 6 gives a square ending in', ['4', '5', '6', '9'], '6'),
      item('m85x-t9', 'Hard', 'm squared minus 1 and m squared plus 1 differ by', ['1', '2', 'm', '4'], '2')
    ]
  }
};
