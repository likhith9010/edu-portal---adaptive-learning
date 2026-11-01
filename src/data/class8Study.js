import { CLASS8_EXTRA } from './class8More.js';

export const CLASS8_CHAPTERS = {
  'm8-1': {
    grade: 'Class 8',
    chapter: 'Chapter 1',
    title: 'Rational Numbers and Their Properties',
    remarks: 'A rational number is a fraction of two integers with a non-zero denominator. Use the properties before you calculate, and always write the answer in standard form.',
    sections: [
      {
        heading: '1. What a rational number is',
        paragraphs: [
          'A rational number is any number that can be written as p/q, where p and q are integers and q is not zero. The integer p is the numerator and the integer q is the denominator. Whole numbers, integers and ordinary fractions are all rational. For example, 5 = 5/1, -7 = -7/1, and 0 = 0/1. A number such as the square root of 2 cannot be written as a ratio of two integers, so it is not rational.',
          'Two rational numbers are equivalent when they name the same point. Multiplying or dividing the numerator and the denominator by the same non-zero integer does not change the value. So 2/3, 4/6 and -6/-9 are the same rational number. Standard form means the denominator is positive and the numerator and denominator have no common factor other than 1. The standard form of -12/18 is -2/3, and the standard form of 15/-20 is -3/4.',
          'On the number line, positive rational numbers lie to the right of zero and negative rational numbers lie to the left. To mark 3/4, divide the unit from 0 to 1 into four equal parts and take the third mark. To mark -5/3, which is -1 2/3, go one whole unit left of zero and then two of the three equal parts of the next unit.'
        ]
      },
      {
        heading: '2. Properties used in calculation',
        paragraphs: [
          'Rational numbers are closed under addition, subtraction and multiplication. The sum, difference and product of two rational numbers is always another rational number. They are not closed under division, because division by zero is not defined. 3/4 divided by 0 has no answer, even though both 3/4 and 0 are rational.',
          'Addition and multiplication are commutative: a + b = b + a, and a x b = b x a. They are also associative: (a + b) + c = a + (b + c), and (a x b) x c = a x (b x c). Subtraction and division are neither commutative nor associative. 1/2 - 1/3 is 1/6, but 1/3 - 1/2 is -1/6.',
          'Multiplication distributes over addition and over subtraction. For rational numbers a, b and c, a x (b + c) = a x b + a x c, and a x (b - c) = a x b - a x c. This is the property that lets you expand brackets. The additive identity is 0, because a + 0 = a. The multiplicative identity is 1, because a x 1 = a.',
          'The additive inverse of a/b is -a/b, and their sum is zero. The multiplicative inverse, or reciprocal, of a non-zero rational a/b is b/a, and their product is 1. Zero has no reciprocal. The reciprocal of a negative number is negative, so the reciprocal of -13/19 is -19/13.'
        ]
      },
      {
        heading: '3. Rational numbers between two rationals',
        paragraphs: [
          'Between any two rational numbers there is another rational number, and in fact infinitely many. One way to find one is to take the average. The average of a and b is (a + b)/2, and it always lies strictly between them when a and b are different. The average of 1/3 and 1/2 is (1/3 + 1/2)/2 = (5/6)/2 = 5/12. Since 1/3 = 4/12 and 1/2 = 6/12, the number 5/12 sits between them.',
          'To list several numbers between two rationals, write both with a larger common denominator. Between 1/4 and 1/2, use denominator 16: 1/4 = 4/16 and 1/2 = 8/16. Then 5/16, 6/16 and 7/16 all lie between them. The same idea works for negatives. Between -2/5 and -1/5, the numbers -7/20 and -3/10 are two examples, because -2/5 = -8/20 and -1/5 = -4/20.'
        ],
        questions: [
          'Q1. Write -18/24 in standard form.',
          'Q2. Is the set of rational numbers closed under division? Give a reason.',
          'Q3. Find the additive inverse and the multiplicative inverse of -7/9.',
          'Q4. Check whether subtraction is commutative using 2/5 and 3/10.',
          'Q5. Use the distributive property to evaluate (3/5) x (10/9 + 5/6).',
          'Q6. Find three rational numbers between 1/5 and 1/4.',
          'Q7. Represent -7/4 on the number line and say which two integers it lies between.',
          'Q8. What is the multiplicative identity, and why does 0 have no reciprocal?'
        ]
      },
      {
        heading: '4. Worked examples',
        paragraphs: [
          'Example 1. Write 36/-48 in standard form. First make the denominator positive by moving the sign to the numerator: 36/-48 = -36/48. The common factor of 36 and 48 is 12, because 36 = 12 x 3 and 48 = 12 x 4. Divide both parts by 12 to get -3/4. The denominator is positive and 3 and 4 share no further common factor, so -3/4 is the standard form. The same steps turn -18/24 into -3/4.',
          'Example 2. Use distributivity to evaluate (3/5) x (10/9 + 5/6). Split the product: (3/5) x (10/9) + (3/5) x (5/6). The first product is 30/45 = 2/3. The second product is 15/30 = 1/2. Now add 2/3 + 1/2. The common denominator is 6, so 4/6 + 3/6 = 7/6. Doing it in this order avoids adding the fractions inside the bracket first, which was the point of the property.',
          'Example 3. Find three rational numbers between 1/5 and 1/4. Write both with denominator 40: 1/5 = 8/40 and 1/4 = 10/40. The integers strictly between 8 and 10 give only 9/40, so enlarge the denominator again. Use 80: 1/5 = 16/80 and 1/4 = 20/80. Then 17/80, 18/80 and 19/80 all lie between them. In standard form, 18/80 = 9/40, and the other two stay as they are.',
          'Example 4. Place -7/4 on the number line. Divide -7 by 4: the quotient is -1 and the remainder is -3, so -7/4 = -1 3/4. From zero, move one whole unit left to -1, then three of the four equal parts toward -2. The point is closer to -2 than to -1. It lies between the integers -2 and -1, and it is not equal to either integer.',
          'Example 5. The additive inverse of -7/9 is 7/9, because -7/9 + 7/9 = 0. The multiplicative inverse is -9/7, because (-7/9) x (-9/7) = 1. Zero is the additive identity, since any rational plus zero is unchanged. One is the multiplicative identity, since any rational times one is unchanged. Zero has no multiplicative inverse: there is no rational r such that 0 x r = 1.'
        ]
      }
    ],
    solve: [
      { id: 'm81-standard', topic: 'Standard form', core: true, prompt: 'Write 28/-42 in standard form and explain the two checks you used.', fallbackHint: 'Make the denominator positive first, then cancel the common factor of 14.' },
      { id: 'm81-closure', topic: 'Closure', core: true, prompt: 'Why are rational numbers closed under multiplication but not under division?', fallbackHint: 'A product of two rationals is a rational. Division by zero is the case that fails.' },
      { id: 'm81-inverse', topic: 'Inverses', core: true, prompt: 'Give the additive inverse and the reciprocal of -13/19.', fallbackHint: 'The additive inverse changes the sign. The reciprocal swaps numerator and denominator and keeps the sign.' },
      { id: 'm81-between', topic: 'Numbers in between', core: true, prompt: 'Find one rational number between 1/3 and 1/2 by the average method.', fallbackHint: 'Add 1/3 and 1/2, then divide that sum by 2. The result is 5/12.' },
      { id: 'm81-commutative', topic: 'Commutative property', core: false, prompt: 'Show with 1/2 and 1/3 that subtraction is not commutative.', fallbackHint: 'Compute both orders. 1/2 - 1/3 and 1/3 - 1/2 are not equal.' },
      { id: 'm81-distribute', topic: 'Distributive property', core: false, prompt: 'Expand (2/3) x (9/4 - 3/8) without multiplying the bracket first.', fallbackHint: 'Multiply 2/3 by each term inside the bracket, then subtract.' },
      { id: 'm81-line', topic: 'Number line', core: false, prompt: 'Which two integers surround -7/4 on the number line?', fallbackHint: '-7/4 is -1 3/4, so it lies between -2 and -1.' },
      { id: 'm81-identity', topic: 'Identities', core: false, prompt: 'Name the additive identity and the multiplicative identity for rational numbers.', fallbackHint: 'Adding 0 changes nothing. Multiplying by 1 changes nothing.' }
    ],
    test: [
      { id: 'm81-t1', prompt: 'Which of these is a rational number?', options: ['Square root of 2', '-7/4', 'pi', 'Square root of 3'], answer: '-7/4' },
      { id: 'm81-t2', prompt: 'The standard form of -18/24 is', options: ['-9/12', '-3/4', '3/-4', '-18/24'], answer: '-3/4' },
      { id: 'm81-t3', prompt: 'Rational numbers are not closed under', options: ['Addition', 'Subtraction', 'Multiplication', 'Division'], answer: 'Division' },
      { id: 'm81-t4', prompt: 'Which operation is commutative for rational numbers?', options: ['Subtraction', 'Division', 'Multiplication', 'Subtraction and division'], answer: 'Multiplication' },
      { id: 'm81-t5', prompt: 'The additive inverse of -7/9 is', options: ['7/9', '-9/7', '9/7', '-7/9'], answer: '7/9' },
      { id: 'm81-t6', prompt: 'The multiplicative inverse of -13/19 is', options: ['13/19', '-13/19', '-19/13', '19/13'], answer: '-19/13' },
      { id: 'm81-t7', prompt: 'The multiplicative identity is', options: ['0', '1', '-1', 'The number itself'], answer: '1' },
      { id: 'm81-t8', prompt: 'Which number has no reciprocal?', options: ['1', '-1', '0', '2/3'], answer: '0' },
      { id: 'm81-t9', prompt: 'The average of 1/3 and 1/2 is', options: ['5/6', '5/12', '2/5', '1/6'], answer: '5/12' },
      { id: 'm81-t10', prompt: 'A rational number between 1/5 and 1/4 could be', options: ['1/6', '9/40', '1/3', '1/2'], answer: '9/40' },
      { id: 'm81-t11', prompt: '-7/4 lies between the integers', options: ['0 and 1', '-1 and 0', '-2 and -1', '-3 and -2'], answer: '-2 and -1' }
    ]
  },
  'm8-2': {
    grade: 'Class 8',
    chapter: 'Chapter 2',
    title: 'Linear Equations in One Variable',
    remarks: 'A linear equation has the variable in the first power only. Move terms carefully, keep both sides balanced, and check the solution by substituting it back.',
    sections: [
      {
        heading: '1. The form of a linear equation',
        paragraphs: [
          'An equation is a statement that two expressions are equal. It is linear in one variable when the variable appears only to the power 1, and only one unknown is present. Examples are 2x + 3 = 11, x/2 - 5 = 7, and 3(y - 2) = 2(y + 1). Equations such as x squared = 9 or 1/x = 4 are not linear.',
          'A solution is a value of the variable that makes both sides equal. You may add or subtract the same number on both sides, and you may multiply or divide both sides by the same non-zero number. These steps keep the equality. Transposing a term means moving it to the other side and changing its sign, which is the same as adding its opposite to both sides.',
          'Always simplify brackets before you transpose. For 8x + 4 = 3(x - 1) + 7, expand the right side first: 3(x - 1) + 7 = 3x - 3 + 7 = 3x + 4. The equation is then 8x + 4 = 3x + 4. Subtract 3x and subtract 4 to get 5x = 0, so x = 0. Substituting x = 0 gives 4 on the left and 3(-1) + 7 = 4 on the right, so the solution checks.'
        ]
      },
      {
        heading: '2. Variables on both sides and fractions',
        paragraphs: [
          'When the variable appears on both sides, collect the variable terms on one side and the number terms on the other. For 5x - 7 = 2x + 8, subtract 2x to get 3x - 7 = 8, then add 7 to get 3x = 15, so x = 5. The check is 5(5) - 7 = 18 and 2(5) + 8 = 18.',
          'If the equation contains fractions, multiply through by the lowest common multiple of the denominators. For (x + 1)/2 = (x - 2)/3, the LCM of 2 and 3 is 6. Multiplying both sides by 6 gives 3(x + 1) = 2(x - 2). Then 3x + 3 = 2x - 4, so x = -7. Check: (-7 + 1)/2 = -3, and (-7 - 2)/3 = -3.',
          'Some equations look complicated until a bracket or a denominator is cleared. For (2x - 3)/4 - (x + 1)/3 = 1, the LCM of 4 and 3 is 12. Multiply every term by 12: 3(2x - 3) - 4(x + 1) = 12. That is 6x - 9 - 4x - 4 = 12, so 2x - 13 = 12 and 2x = 25. Thus x = 25/2. Leave an answer as a fraction when it does not simplify to an integer.'
        ]
      },
      {
        heading: '3. Word problems',
        paragraphs: [
          'Translate the sentence into an equation before you calculate. If three consecutive integers add up to 72, let the first be n. The next two are n + 1 and n + 2. Then n + (n + 1) + (n + 2) = 72, so 3n + 3 = 72, 3n = 69 and n = 23. The integers are 23, 24 and 25.',
          'In an age problem, write every age in terms of one variable. Riya is 4 years older than Arun, and the sum of their ages is 36. Let Arun be y years. Then y + (y + 4) = 36, so 2y = 32 and y = 16. Arun is 16 and Riya is 20.',
          'In a two-digit number, the tens digit is worth ten times its face value. Suppose the digits differ by 3, the tens digit is larger, and the number is 7 times the sum of its digits. Let the tens digit be a. The units digit is a - 3. The number is 10a + (a - 3) = 11a - 3, and the sum of the digits is 2a - 3. Then 11a - 3 = 7(2a - 3), so 11a - 3 = 14a - 21, and 18 = 3a. Thus a = 6 and the units digit is 3. The number is 63. Check: the digits differ by 3, their sum is 9, and 7 x 9 = 63.'
        ],
        questions: [
          'Q1. Solve 8x + 4 = 3(x - 1) + 7 and check the root.',
          'Q2. Solve 5x - 7 = 2x + 8.',
          'Q3. Solve (x + 1)/2 = (x - 2)/3.',
          'Q4. The sum of three consecutive integers is 72. Find them.',
          'Q5. Riya is 4 years older than Arun and their ages add to 36. Find both ages.',
          'Q6. A two-digit number has digits differing by 3, the tens digit is larger, and the number is 7 times the sum of its digits. Find the number.',
          'Q7. Why is x squared = 16 not a linear equation?',
          'Q8. What must you never divide both sides by?'
        ]
      },
      {
        heading: '4. Worked examples',
        paragraphs: [
          'Example 1. Solve 8x + 4 = 3(x - 1) + 7. Expand the bracket: 3(x - 1) + 7 = 3x - 3 + 7 = 3x + 4. The equation is now 8x + 4 = 3x + 4. Subtract 3x from both sides: 5x + 4 = 4. Subtract 4 from both sides: 5x = 0, so x = 0. Check in the original equation. Left side: 8(0) + 4 = 4. Right side: 3(0 - 1) + 7 = -3 + 7 = 4. The two sides match.',
          'Example 2. Solve (x + 1)/2 = (x - 2)/3. The denominators are 2 and 3, so multiply every term by 6. You get 3(x + 1) = 2(x - 2). Expand: 3x + 3 = 2x - 4. Subtract 2x from both sides: x + 3 = -4. Subtract 3: x = -7. Check: (-7 + 1)/2 = -6/2 = -3, and (-7 - 2)/3 = -9/3 = -3. A negative root is acceptable. The check is what tells you the sign was handled correctly.',
          'Example 3. Three consecutive integers add to 72. Let the first be n, the second n + 1 and the third n + 2. Their sum is 3n + 3 = 72. Subtract 3: 3n = 69. Divide by 3: n = 23. The integers are 23, 24 and 25. Check: 23 + 24 + 25 = 72. If the problem had asked for consecutive even integers, the step would be n, n + 2 and n + 4 instead.',
          'Example 4. Riya is 4 years older than Arun, and the sum of their ages is 36. Let Arun be y years. Riya is y + 4. Then y + (y + 4) = 36, so 2y + 4 = 36, 2y = 32 and y = 16. Arun is 16 and Riya is 20. Check: 20 is 4 more than 16, and 16 + 20 = 36.',
          'Example 5. Digits differ by 3, the tens digit is larger, and the number is 7 times the sum of its digits. Let the tens digit be a. The units digit is a - 3. The number is 11a - 3 and the digit sum is 2a - 3. Set 11a - 3 = 7(2a - 3) = 14a - 21. Then 21 - 3 = 14a - 11a, so 18 = 3a and a = 6. The number is 63. Check: 6 - 3 = 3, and 7 x (6 + 3) = 63.'
        ],
        steps: [
          'Board check 1. An equation stays linear only when the unknown has power 1.',
          'Board check 2. Expand brackets before you collect like terms.',
          'Board check 3. Transposing a term changes its sign. That is the same as adding its opposite.',
          'Board check 4. Multiply by the LCM of the denominators, never by zero.',
          'Board check 5. A root can be negative, zero, or a fraction. The check still has to balance.',
          'Board check 6. In a word problem, write the equation in one variable before any arithmetic.',
          'Board check 7. Consecutive integers differ by 1. Consecutive even integers differ by 2.',
          'Board check 8. A two-digit number 10a + b is not the same as the sum a + b.'
        ]
      }
    ],
    solve: [
      { id: 'm82-expand', topic: 'Expand, then balance', core: true, prompt: 'Solve 8x + 4 = 3(x - 1) + 7 and show the check.', fallbackHint: 'Expand the right side to 3x + 4. Then 5x = 0, so x = 0. Both sides become 4.' },
      { id: 'm82-both', topic: 'Variable on both sides', core: true, prompt: 'Solve 5x - 7 = 2x + 8.', fallbackHint: 'Subtract 2x, then add 7. You should reach 3x = 15.' },
      { id: 'm82-fraction', topic: 'Clearing fractions', core: true, prompt: 'Solve (x + 1)/2 = (x - 2)/3.', fallbackHint: 'Multiply both sides by 6, the LCM of 2 and 3. The solution is x = -7.' },
      { id: 'm82-consecutive', topic: 'Consecutive integers', core: true, prompt: 'Three consecutive integers add to 72. What are they?', fallbackHint: 'Let the first be n. Then n, n + 1 and n + 2 add to 72, so n = 23.' },
      { id: 'm82-age', topic: 'Age problem', core: false, prompt: 'Riya is 4 years older than Arun. Their ages add to 36. Find both ages.', fallbackHint: 'Let Arun be y. Then y + (y + 4) = 36.' },
      { id: 'm82-digit', topic: 'Digit problem', core: false, prompt: 'The digits of a two-digit number differ by 3, the tens digit is larger, and the number is 7 times the sum of its digits. Find it.', fallbackHint: 'Let the tens digit be a and the units digit be a - 3. The number 11a - 3 equals 7 times (2a - 3).' },
      { id: 'm82-check', topic: 'Checking a root', core: false, prompt: 'Why is substituting the value back into the original equation necessary?', fallbackHint: 'A transposition or a cleared denominator can hide an arithmetic slip. Both sides must match.' },
      { id: 'm82-linear', topic: 'What counts as linear', core: false, prompt: 'Why is x squared = 16 not called a linear equation in one variable?', fallbackHint: 'The variable is raised to the power 2. A linear equation uses power 1 only.' }
    ],
    test: [
      { id: 'm82-t1', prompt: 'Which equation is linear in one variable?', options: ['x squared = 9', '2x + 3 = 11', '1/x = 4', 'xy = 6'], answer: '2x + 3 = 11' },
      { id: 'm82-t2', prompt: 'The solution of 8x + 4 = 3(x - 1) + 7 is', options: ['x = 0', 'x = 1', 'x = 4', 'x = 5'], answer: 'x = 0' },
      { id: 'm82-t3', prompt: 'The solution of 5x - 7 = 2x + 8 is', options: ['x = 3', 'x = 5', 'x = 15', 'x = 1'], answer: 'x = 5' },
      { id: 'm82-t4', prompt: 'The solution of (x + 1)/2 = (x - 2)/3 is', options: ['x = 7', 'x = -7', 'x = 1', 'x = -1'], answer: 'x = -7' },
      { id: 'm82-t5', prompt: 'To clear denominators 2 and 3 you multiply by', options: ['5', '6', '2', '3'], answer: '6' },
      { id: 'm82-t6', prompt: 'Three consecutive integers that add to 72 are', options: ['22, 23, 24', '23, 24, 25', '24, 25, 26', '20, 24, 28'], answer: '23, 24, 25' },
      { id: 'm82-t7', prompt: 'If Arun is y years old and Riya is 4 years older, Riya is', options: ['y - 4', '4y', 'y + 4', 'y/4'], answer: 'y + 4' },
      { id: 'm82-t8', prompt: 'Arun and Riya’s ages in the worksheet problem are', options: ['14 and 18', '16 and 20', '18 and 22', '12 and 24'], answer: '16 and 20' },
      { id: 'm82-t9', prompt: 'A two-digit number with tens digit a and units digit b has value', options: ['a + b', '10b + a', '10a + b', 'ab'], answer: '10a + b' },
      { id: 'm82-t10', prompt: 'The digit-problem number on this worksheet is', options: ['36', '63', '96', '69'], answer: '63' },
      { id: 'm82-t11', prompt: 'You may divide both sides of an equation only by', options: ['Zero', 'A non-zero number', 'The variable even if it is zero', 'Any fraction including 0/1 as the divisor zero'], answer: 'A non-zero number' }
    ]
  },
  'm8-3': {
    grade: 'Class 8',
    chapter: 'Chapter 3',
    title: 'Understanding Quadrilaterals',
    remarks: 'Use the angle-sum rules before you look at special names. A regular polygon has equal sides and equal angles. Opposite sides and opposite angles are the facts that identify a parallelogram.',
    sections: [
      {
        heading: '1. Polygons and interior angles',
        paragraphs: [
          'A polygon is a closed plane figure made of line segments. A triangle has 3 sides, a quadrilateral has 4, a pentagon 5, a hexagon 6 and an octagon 8. A polygon is convex when every interior angle is less than 180 degrees and any line segment joining two points of the polygon stays inside it. A diagonal joins two non-adjacent vertices. A quadrilateral has 2 diagonals, a pentagon has 5, and a hexagon has 9.',
          'The sum of the interior angles of a polygon with n sides is (n - 2) x 180 degrees. A quadrilateral has (4 - 2) x 180 = 360 degrees. A pentagon has 540 degrees and a hexagon has 720 degrees. If three angles of a quadrilateral are 80, 100 and 110 degrees, the fourth is 360 - 290 = 70 degrees.',
          'A regular polygon has all sides equal and all interior angles equal. Each interior angle of a regular polygon is the angle sum divided by n. For a regular hexagon that is 720/6 = 120 degrees. For a regular pentagon it is 540/5 = 108 degrees.'
        ]
      },
      {
        heading: '2. Exterior angles',
        paragraphs: [
          'At each vertex, an exterior angle is formed by extending one side. The interior angle and the exterior angle at the same vertex are adjacent angles on a straight line, so they add to 180 degrees. The sum of the exterior angles of any convex polygon, taking one at each vertex, is 360 degrees. This does not depend on the number of sides.',
          'For a regular polygon the exterior angles are equal, so each exterior angle is 360/n degrees. A regular nonagon has 9 sides, so each exterior angle is 360/9 = 40 degrees. The interior angle is then 180 - 40 = 140 degrees. If each exterior angle of a regular polygon is 24 degrees, the number of sides is 360/24 = 15.'
        ]
      },
      {
        heading: '3. Parallelograms and the special names',
        paragraphs: [
          'A parallelogram is a quadrilateral with both pairs of opposite sides parallel. In a parallelogram the opposite sides are equal, the opposite angles are equal, and the consecutive angles are supplementary. The diagonals bisect each other, but they are not necessarily equal and they do not have to meet at right angles.',
          'A rectangle is a parallelogram with a right angle, so all four angles are 90 degrees and the diagonals are equal. A rhombus is a parallelogram with all sides equal. Its diagonals bisect each other at right angles and they bisect the vertex angles. A square is both a rectangle and a rhombus: equal sides, right angles, and equal diagonals that cross at right angles.',
          'A kite has two pairs of adjacent equal sides. Its diagonals meet at right angles, and one diagonal is a line of symmetry. A trapezium in this course has one pair of parallel sides. Those parallel sides are the bases. An isosceles trapezium has the non-parallel sides equal, and its base angles are equal. Every square is a rectangle and a rhombus, but a rhombus is a square only when its angles are right angles.'
        ],
        questions: [
          'Q1. Find the fourth angle of a quadrilateral whose other angles are 80, 100 and 110 degrees.',
          'Q2. Find each exterior angle of a regular nonagon.',
          'Q3. How many sides does a regular polygon have if each exterior angle is 24 degrees?',
          'Q4. State two properties of the diagonals of a parallelogram.',
          'Q5. Which properties does a square have that a general rhombus may not have?',
          'Q6. The opposite angles of a parallelogram are equal. If one angle is 70 degrees, find the other three.',
          'Q7. Why do the exterior angles of any convex polygon add to 360 degrees, whatever the number of sides?',
          'Q8. Name a quadrilateral with exactly one pair of parallel sides.'
        ]
      },
      {
        heading: '4. Worked examples',
        paragraphs: [
          'Example 1. Three angles of a quadrilateral are 80, 100 and 110 degrees. The interior sum of any quadrilateral is (4 - 2) x 180 = 360 degrees. The known angles add to 290, so the fourth angle is 360 - 290 = 70 degrees. The same rule gives the interior sum of a pentagon as (5 - 2) x 180 = 540 degrees, and of a hexagon as 720 degrees.',
          'Example 2. A regular nonagon has 9 equal exterior angles, and the exterior angles of any convex polygon add to 360 degrees. Each exterior angle is 360/9 = 40 degrees. The interior angle at the same vertex lies on a straight line with it, so the interior angle is 180 - 40 = 140 degrees. You can check with the interior-sum rule: (9 - 2) x 180 = 1260, and 1260/9 = 140.',
          'Example 3. Each exterior angle of a regular polygon is 24 degrees. The number of sides is 360/24 = 15. It is a regular 15-gon. Each interior angle is 180 - 24 = 156 degrees. If a question gives an interior angle instead, subtract it from 180 to get the exterior angle, then divide 360 by that exterior angle.',
          'Example 4. One angle of a parallelogram is 70 degrees. Opposite angles are equal, so the angle opposite it is also 70 degrees. Consecutive angles are supplementary, so each remaining angle is 180 - 70 = 110 degrees. The four angles are 70, 110, 70 and 110. They add to 360, which confirms the result. The diagonals of this parallelogram still bisect each other, but they are not forced to be equal unless the parallelogram is a rectangle.',
          'Example 5. Decide the name from the properties, not from the picture alone. Both pairs of opposite sides parallel means a parallelogram. All angles right means a rectangle. All sides equal means a rhombus. All sides equal and all angles right means a square. Exactly one pair of parallel sides means a trapezium. A rhombus becomes a square only when a corner is a right angle, because the equal sides are already there.'
        ]
      }
    ],
    solve: [
      { id: 'm83-sum', topic: 'Interior angle sum', core: true, prompt: 'Three angles of a quadrilateral are 80, 100 and 110 degrees. Find the fourth.', fallbackHint: 'The four angles add to 360 degrees. Subtract 290 from 360.' },
      { id: 'm83-exterior', topic: 'Exterior angles', core: true, prompt: 'Find each exterior angle of a regular nonagon, then the interior angle.', fallbackHint: 'A nonagon has 9 sides. Each exterior angle is 360/9. The interior angle is 180 minus that.' },
      { id: 'm83-sides', topic: 'Number of sides', core: true, prompt: 'Each exterior angle of a regular polygon is 24 degrees. How many sides does it have?', fallbackHint: 'The exterior angles add to 360, and they are equal, so the side count is 360/24.' },
      { id: 'm83-parallelogram', topic: 'Parallelogram angles', core: true, prompt: 'One angle of a parallelogram is 70 degrees. Find the other three.', fallbackHint: 'Opposite angles match, so another angle is 70. Consecutive angles add to 180, so the other pair is 110.' },
      { id: 'm83-diagonals', topic: 'Diagonals', core: false, prompt: 'What is always true of the diagonals of a parallelogram, and what extra fact is true in a rhombus?', fallbackHint: 'In every parallelogram the diagonals bisect each other. In a rhombus they also meet at right angles.' },
      { id: 'm83-square', topic: 'Square and rhombus', core: false, prompt: 'When is a rhombus also a square?', fallbackHint: 'All sides are already equal. It becomes a square when the angles are right angles.' },
      { id: 'm83-regular', topic: 'Regular polygon', core: false, prompt: 'Find each interior angle of a regular hexagon.', fallbackHint: 'The interior sum is (6 - 2) x 180 = 720. Divide by 6.' },
      { id: 'm83-trapezium', topic: 'Trapezium', core: false, prompt: 'How is a trapezium different from a parallelogram in this chapter?', fallbackHint: 'A trapezium has exactly one pair of parallel sides. A parallelogram has both pairs parallel.' }
    ],
    test: [
      { id: 'm83-t1', prompt: 'The sum of the interior angles of a quadrilateral is', options: ['180 degrees', '270 degrees', '360 degrees', '540 degrees'], answer: '360 degrees' },
      { id: 'm83-t2', prompt: 'If three angles are 80, 100 and 110 degrees, the fourth is', options: ['60 degrees', '70 degrees', '80 degrees', '90 degrees'], answer: '70 degrees' },
      { id: 'm83-t3', prompt: 'The sum of the exterior angles of any convex polygon is', options: ['180 degrees', '360 degrees', '(n - 2) x 180 degrees', '90 degrees'], answer: '360 degrees' },
      { id: 'm83-t4', prompt: 'Each exterior angle of a regular nonagon is', options: ['30 degrees', '36 degrees', '40 degrees', '45 degrees'], answer: '40 degrees' },
      { id: 'm83-t5', prompt: 'A regular polygon with each exterior angle 24 degrees has', options: ['12 sides', '15 sides', '18 sides', '24 sides'], answer: '15 sides' },
      { id: 'm83-t6', prompt: 'Each interior angle of a regular hexagon is', options: ['108 degrees', '120 degrees', '135 degrees', '140 degrees'], answer: '120 degrees' },
      { id: 'm83-t7', prompt: 'In a parallelogram, consecutive angles are', options: ['Equal', 'Supplementary', 'Complementary', 'Always 60 degrees'], answer: 'Supplementary' },
      { id: 'm83-t8', prompt: 'If one angle of a parallelogram is 70 degrees, an adjacent angle is', options: ['70 degrees', '90 degrees', '110 degrees', '140 degrees'], answer: '110 degrees' },
      { id: 'm83-t9', prompt: 'The diagonals of a parallelogram always', options: ['Are equal', 'Meet at right angles', 'Bisect each other', 'Bisect the vertex angles'], answer: 'Bisect each other' },
      { id: 'm83-t10', prompt: 'A rhombus is a square when', options: ['All sides are equal', 'The diagonals bisect each other', 'Its angles are right angles', 'It has one pair of parallel sides'], answer: 'Its angles are right angles' },
      { id: 'm83-t11', prompt: 'A quadrilateral with exactly one pair of parallel sides is a', options: ['Parallelogram', 'Rhombus', 'Kite', 'Trapezium'], answer: 'Trapezium' }
    ]
  },
  'm8-4': {
    grade: 'Class 8',
    chapter: 'Chapter 4',
    title: 'Data Handling and Chance',
    remarks: 'Group the data before you draw. A pie chart uses a 360 degree circle, so each category gets an angle of (its frequency divided by the total) times 360. Probability is a number from 0 to 1.',
    sections: [
      {
        heading: '1. Frequency and grouped data',
        paragraphs: [
          'Raw data is a list of observations. A frequency table counts how often each value, or each group of values, occurs. The frequency of a value is that count. If the values spread widely, group them into class intervals of equal width. The class size is the difference between the upper and lower limits of a class. For the class 10-20, if 20 is not included, the width is 10.',
          'A histogram displays grouped continuous data. Each bar stands on a class interval, and there are no gaps between the bars because the scale is continuous. The height of a bar shows the frequency of that class. A bar graph, by contrast, is used for separate categories such as favourite sport. Its bars are drawn with gaps so that the categories are not read as a continuous scale.',
          'Suppose the heights in centimetres of 20 students are grouped as 140-145, 145-150, 150-155 and 155-160 with frequencies 3, 7, 6 and 4. The class size is 5. The modal class is 145-150 because it has the greatest frequency. The total frequency is 3 + 7 + 6 + 4 = 20, which matches the number of students.'
        ]
      },
      {
        heading: '2. Pie charts',
        paragraphs: [
          'A pie chart shows each category as a sector of a circle. The whole circle is 360 degrees and stands for the whole data set. The central angle of a category is (frequency of the category / total frequency) x 360 degrees. A category that is 25 percent of the data has central angle (25/100) x 360 = 90 degrees. A category that is one third of the data has central angle 120 degrees.',
          'Worked example. A class spends a day as follows: sleep 8 hours, school 7 hours, play 3 hours, study 4 hours, other 2 hours. The total is 24 hours. Sleep gets (8/24) x 360 = 120 degrees. School gets (7/24) x 360 = 105 degrees. Play gets (3/24) x 360 = 45 degrees. Study gets (4/24) x 360 = 60 degrees. Other gets (2/24) x 360 = 30 degrees. The angles add to 120 + 105 + 45 + 60 + 30 = 360, which is the check.',
          'If you are given the central angle and the total, you can recover the frequency. Frequency = (central angle / 360) x total. A 60 degree sector in a survey of 180 people represents (60/360) x 180 = 30 people.'
        ]
      },
      {
        heading: '3. Probability',
        paragraphs: [
          'An experiment is random when we know the possible results but not which one will occur. Each result is an outcome. The set of all outcomes is the sample space. For a fair coin the outcomes are heads and tails. For a fair six-faced die the outcomes are 1, 2, 3, 4, 5 and 6. Equally likely outcomes have the same chance.',
          'The probability of an event is the number of favourable outcomes divided by the number of equally likely outcomes. It is a number from 0 to 1 inclusive. An impossible event has probability 0. A certain event has probability 1. The probability of a number greater than 4 on a fair die is 2/6 = 1/3, because 5 and 6 are favourable. The probability of a number less than 7 is 1, because every face is less than 7. The probability of a 7 is 0.',
          'If the probability of an event happening is p, the probability that it does not happen is 1 - p. These two probabilities add to 1. If the chance of rain tomorrow is 0.3, the chance that it does not rain is 0.7.'
        ],
        questions: [
          'Q1. In the height table, which class is the modal class, and what is the class size?',
          'Q2. Why does a histogram have no gaps, while a bar graph does?',
          'Q3. Find the central angle for a category that is 25 percent of the data.',
          'Q4. In the 24-hour day, find the sector angles for sleep and for play.',
          'Q5. A 60 degree sector represents how many people in a survey of 180?',
          'Q6. A fair die is thrown. Find the probability of a number greater than 4.',
          'Q7. What is the probability of an impossible event, and of a certain event?',
          'Q8. If the probability of rain is 0.3, what is the probability of no rain?'
        ]
      },
      {
        heading: '4. Worked examples',
        paragraphs: [
          'Example 1. Twenty students have heights grouped as 140-145, 145-150, 150-155 and 155-160, with frequencies 3, 7, 6 and 4. The class size is 145 - 140 = 5. The greatest frequency is 7, so the modal class is 145-150. The frequencies add to 20, which matches the number of students. On a histogram these four bars touch, because a height of 145 cm is the boundary between two classes on a continuous scale.',
          'Example 2. A category is 25 percent of the data in a pie chart. Its central angle is (25/100) x 360 = 90 degrees. One quarter of a circle is a right angle, which is a useful picture to remember. A category that is one third of the data gets (1/3) x 360 = 120 degrees. Before you finish a pie chart, add the sector angles. They must come to 360 degrees.',
          'Example 3. A student day of 24 hours is sleep 8, school 7, play 3, study 4 and other 2. Sleep: (8/24) x 360 = 120 degrees. School: (7/24) x 360 = 105 degrees. Play: (3/24) x 360 = 45 degrees. Study: (4/24) x 360 = 60 degrees. Other: (2/24) x 360 = 30 degrees. The check is 120 + 105 + 45 + 60 + 30 = 360. If the total of the hours had not been 24, the fractions would have used that other total instead.',
          'Example 4. A survey of 180 people has a sector of 60 degrees. The number of people is (60/360) x 180. First, 60/360 = 1/6. Then (1/6) x 180 = 30. So the sector stands for 30 people. The same rearrangement, frequency = (angle / 360) x total, is how you read a pie chart when the angle is given and the count is not.',
          'Example 5. A fair die has six equally likely faces. The event "greater than 4" has favourable outcomes 5 and 6, so its probability is 2/6 = 1/3. The event "a 7" has no favourable outcome, so its probability is 0. The event "less than 7" includes every face, so its probability is 1. If rain has probability 0.3, no rain has probability 1 - 0.3 = 0.7. An answer below 0 or above 1 means the fraction was set up upside down.'
        ]
      }
    ],
    solve: [
      { id: 'm84-modal', topic: 'Grouped frequency', core: true, prompt: 'Heights are grouped 140-145, 145-150, 150-155, 155-160 with frequencies 3, 7, 6 and 4. Name the modal class and the class size.', fallbackHint: 'The modal class has the highest frequency. The width of 140-145 is 5.' },
      { id: 'm84-histogram', topic: 'Histogram and bar graph', core: true, prompt: 'Why are histogram bars drawn without gaps?', fallbackHint: 'The classes form a continuous scale. Gaps are kept for separate categories on a bar graph.' },
      { id: 'm84-pie', topic: 'Pie-chart angle', core: true, prompt: 'What central angle represents 25 percent of a pie chart?', fallbackHint: 'Take 25 percent of 360 degrees.' },
      { id: 'm84-day', topic: 'A day as a pie chart', core: true, prompt: 'Sleep is 8 hours of a 24-hour day. What is its central angle? What is the angle for 3 hours of play?', fallbackHint: 'Angle = (hours / 24) x 360. Sleep is 120 degrees and play is 45 degrees.' },
      { id: 'm84-recover', topic: 'Frequency from an angle', core: false, prompt: 'A 60 degree sector is part of a survey of 180 people. How many people is that?', fallbackHint: 'Frequency = (60/360) x 180.' },
      { id: 'm84-die', topic: 'A fair die', core: false, prompt: 'A fair die is thrown. What is the probability of a number greater than 4?', fallbackHint: 'The favourable faces are 5 and 6, out of 6 equally likely faces.' },
      { id: 'm84-bounds', topic: 'Zero and one', core: false, prompt: 'Give an event of probability 0 and an event of probability 1 for a standard die.', fallbackHint: 'Rolling a 7 is impossible. Rolling a number less than 7 is certain.' },
      { id: 'm84-complement', topic: 'The opposite event', core: false, prompt: 'If the probability of rain is 0.3, what is the probability of no rain?', fallbackHint: 'The two probabilities add to 1, so subtract 0.3 from 1.' }
    ],
    test: [
      { id: 'm84-t1', prompt: 'The modal class of frequencies 3, 7, 6 and 4 for classes starting at 140 is', options: ['140-145', '145-150', '150-155', '155-160'], answer: '145-150' },
      { id: 'm84-t2', prompt: 'The class size of the interval 140-145 in this worksheet is', options: ['3', '4', '5', '7'], answer: '5' },
      { id: 'm84-t3', prompt: 'A histogram is used for', options: ['Separate categories with gaps', 'Grouped continuous data', 'Only percentages', 'A single number'], answer: 'Grouped continuous data' },
      { id: 'm84-t4', prompt: 'The central angle for 25 percent of a pie chart is', options: ['25 degrees', '45 degrees', '90 degrees', '180 degrees'], answer: '90 degrees' },
      { id: 'm84-t5', prompt: 'Sleep of 8 hours in a 24-hour day has central angle', options: ['90 degrees', '105 degrees', '120 degrees', '180 degrees'], answer: '120 degrees' },
      { id: 'm84-t6', prompt: 'Play of 3 hours in a 24-hour day has central angle', options: ['30 degrees', '45 degrees', '60 degrees', '90 degrees'], answer: '45 degrees' },
      { id: 'm84-t7', prompt: 'The day-chart angles on this worksheet add to', options: ['180 degrees', '300 degrees', '360 degrees', '24 degrees'], answer: '360 degrees' },
      { id: 'm84-t8', prompt: 'A 60 degree sector in a survey of 180 people represents', options: ['20 people', '30 people', '60 people', '90 people'], answer: '30 people' },
      { id: 'm84-t9', prompt: 'The probability of a number greater than 4 on a fair die is', options: ['1/6', '1/3', '1/2', '2/3'], answer: '1/3' },
      { id: 'm84-t10', prompt: 'The probability of an impossible event is', options: ['0', '1/2', '1', 'Greater than 1'], answer: '0' },
      { id: 'm84-t11', prompt: 'If the probability of rain is 0.3, the probability of no rain is', options: ['0.3', '0.5', '0.7', '1.3'], answer: '0.7' }
    ]
  },
  'm8-5': {
    grade: 'Class 8',
    chapter: 'Chapter 5',
    title: 'Squares and Square Roots',
    remarks: 'Use the properties of square numbers to reject impossible answers before you calculate. A square root by the division method is finished only when the remainder is zero or you have the decimals you need.',
    sections: [
      {
        heading: '1. Properties of square numbers',
        paragraphs: [
          'The square of a number n is n x n, written n^2. Square numbers are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, and so on. A square number can end only with digit 0, 1, 4, 5, 6 or 9. It cannot end with 2, 3, 7 or 8. So 1842 cannot be a perfect square, because it ends with 2. If a square ends with 0, it ends with an even number of zeros. 100 and 10000 are squares, but 10 and 1000 are not.',
          'If a number ends with 5, its square ends with 25. The square of an even number is even, and the square of an odd number is odd. Between n^2 and (n + 1)^2 there are exactly 2n natural numbers, and none of them is a perfect square. Between 4 and 9, n = 2, so there are 4 non-squares: 5, 6, 7 and 8. Between 15^2 = 225 and 16^2 = 256 there are 2 x 15 = 30 non-squares.',
          'The square of a number with units digit 1 or 9 ends with 1. Units digit 2 or 8 gives a square ending in 4. Units digit 3 or 7 gives a square ending in 9. Units digit 4 or 6 gives a square ending in 6. Units digit 5 gives 25, and units digit 0 gives 00.'
        ]
      },
      {
        heading: '2. Pythagorean triplets',
        paragraphs: [
          'A Pythagorean triplet is three positive integers a, b and c such that a^2 + b^2 = c^2. The family 2m, m^2 - 1 and m^2 + 1 works for an integer m greater than 1. For m = 2 the numbers are 4, 3 and 5, and 3^2 + 4^2 = 9 + 16 = 25 = 5^2. For m = 3 the numbers are 6, 8 and 10, which is the 3-4-5 triangle scaled by 2. For m = 4 the numbers are 8, 15 and 17, and 64 + 225 = 289 = 17^2.',
          'Any positive multiple of a triplet is again a triplet. Since 3, 4, 5 works, so does 6, 8, 10 and 9, 12, 15. If you are given two members and asked for the third, test which formula fits. The smallest even member is often 2m. If 2m = 12, then m = 6, so the other two members are 36 - 1 = 35 and 36 + 1 = 37. Check: 12^2 + 35^2 = 144 + 1225 = 1369 = 37^2.'
        ]
      },
      {
        heading: '3. Finding a square root',
        paragraphs: [
          'If a number is a perfect square, its prime factors can be paired. The square root is the product of one factor from each pair. For 729, the factorisation is 729 = 3 x 3 x 3 x 3 x 3 x 3, which is three pairs of 3. The square root is 3 x 3 x 3 = 27. Check: 27 x 27 = 729. For 2025, 2025 = 5 x 5 x 3 x 3 x 3 x 3, so the square root is 5 x 3 x 3 = 45.',
          'The division method works even when you have not fully factored the number. Mark digits in pairs from the right. For 729 the pairs are 7 and 29. The largest square not above 7 is 4, which is 2^2, so the first digit of the root is 2. Subtract to leave 3, bring down 29, and the new dividend is 329. Double the current root 2 to get 4. Find the digit d such that (40 + d) x d is as large as possible without passing 329. The digit 7 gives 47 x 7 = 329 exactly. The remainder is 0 and the square root is 27.',
          'The same method gives a decimal root. For 2, pair as 2.000000. The first digit is 1. Continue with pairs of zeros. The root begins 1.414, and you stop when you have the number of decimal places the question asks for. A remainder of zero means the original number was a perfect square.'
        ],
        questions: [
          'Q1. Which of 1842, 2500 and 1225 can be perfect squares? Use the units digit.',
          'Q2. How many non-square numbers lie between 15^2 and 16^2?',
          'Q3. Write a Pythagorean triplet with m = 4, and check a^2 + b^2 = c^2.',
          'Q4. Find the triplet that contains 12 as the member 2m.',
          'Q5. Find the square root of 729 by pairing prime factors.',
          'Q6. Find the square root of 2025.',
          'Q7. In the division method for 729, which multiplication shows that the next digit is 7?',
          'Q8. Why can a perfect square not end with exactly three zeros?'
        ]
      },
      {
        heading: '4. Worked examples',
        paragraphs: [
          'Example 1. Test 1842, 2500 and 1225 by the final digit before you factor them. A square cannot end in 2, 3, 7 or 8, so 1842 is not a square. A square may end in 0 only when the number of final zeros is even, and 2500 ends in two zeros, so it is still possible. In fact 50^2 = 2500. The number 1225 ends in 25, which is allowed for a number that itself ends in 5. Its square root is 35, because 35 x 35 = 1225.',
          'Example 2. Count the non-squares between 15^2 and 16^2. The rule is that n^2 and (n + 1)^2 have exactly 2n natural numbers between them, and none of those is a square. Here n = 15, so there are 30 such numbers. They run from 226 to 255. You do not need to list them. The same rule says there are 4 numbers between 2^2 and 3^2, namely 5, 6, 7 and 8.',
          'Example 3. Build the triplet for m = 4. The three numbers are 2m = 8, m^2 - 1 = 15, and m^2 + 1 = 17. Check the relation: 8^2 + 15^2 = 64 + 225 = 289, and 17^2 = 289. For m = 2 the same formula gives 4, 3 and 5. Multiples work too: 6, 8, 10 is 3, 4, 5 multiplied by 2, and 9, 12, 15 is 3, 4, 5 multiplied by 3.',
          'Example 4. The member 12 is the even member 2m of a triplet. Then m = 6. The other members are 36 - 1 = 35 and 36 + 1 = 37. Check: 12^2 + 35^2 = 144 + 1225 = 1369, and 37^2 = 1369. Writing the even member as 2m is what tells you the value of m. If the given member is odd, it is usually m^2 - 1 or m^2 + 1, and those two differ by 2.',
          'Example 5. Find the square root of 729 by factors and by division. Factor: 729 = 3 x 3 x 3 x 3 x 3 x 3, three pairs, so the root is 3 x 3 x 3 = 27. Division: pair the digits as 7 and 29. The largest square not above 7 is 2^2 = 4. Subtract to leave 3 and bring down 29, getting 329. Double 2 to get 4. The digit 7 fits because 47 x 7 = 329 exactly, and the remainder is 0. Both methods agree that the square root is 27. The square root of 2025 is 45, from the pairs 5 x 5 and 3 x 3 and 3 x 3.'
        ]
      }
    ],
    solve: [
      { id: 'm85-units', topic: 'Units digit of a square', core: true, prompt: 'Explain why 1842 cannot be a perfect square, while 2500 can.', fallbackHint: 'A square cannot end in 2. A square may end in an even count of zeros, and 2500 ends in two zeros.' },
      { id: 'm85-gap', topic: 'Numbers between squares', core: true, prompt: 'How many non-square numbers lie between 15 squared and 16 squared?', fallbackHint: 'Between n squared and (n + 1) squared there are 2n non-squares. Here n = 15.' },
      { id: 'm85-triplet', topic: 'Pythagorean triplet', core: true, prompt: 'Write the triplet for m = 4 and check that the sum of the smaller squares equals the largest square.', fallbackHint: 'Use 2m, m squared minus 1, and m squared plus 1. That is 8, 15 and 17.' },
      { id: 'm85-root', topic: 'Square root by factors', core: true, prompt: 'Find the square root of 729 by pairing its prime factors.', fallbackHint: '729 is six factors of 3. Three pairs give 3 x 3 x 3 = 27.' },
      { id: 'm85-division', topic: 'Division method', core: false, prompt: 'In the division method for 729, show the step that produces the digit 7.', fallbackHint: 'After the first digit 2, the dividend is 329 and the trial divisor starts with 4. Then 47 x 7 = 329.' },
      { id: 'm85-twelve', topic: 'A triplet containing 12', core: false, prompt: '12 is the even member 2m of a triplet. Find the other two members.', fallbackHint: 'm = 6. The other members are m squared minus 1 and m squared plus 1.' },
      { id: 'm85-2025', topic: 'Square root of 2025', core: false, prompt: 'Find the square root of 2025 from its prime factors.', fallbackHint: '2025 = 5 x 5 x 3 x 3 x 3 x 3. Take one factor from each pair.' },
      { id: 'm85-zeros', topic: 'Trailing zeros', core: false, prompt: 'Why can a perfect square not end with exactly three zeros?', fallbackHint: 'Zeros in a square come in pairs of factors of 10. The count of trailing zeros is even.' }
    ],
    test: [
      { id: 'm85-t1', prompt: 'Which number cannot be a perfect square?', options: ['1225', '2500', '1842', '625'], answer: '1842' },
      { id: 'm85-t2', prompt: 'A perfect square can end with the digit', options: ['2', '3', '7', '6'], answer: '6' },
      { id: 'm85-t3', prompt: 'The number of non-squares between 15^2 and 16^2 is', options: ['15', '16', '30', '31'], answer: '30' },
      { id: 'm85-t4', prompt: 'For m = 4 the Pythagorean triplet from the worksheet formula is', options: ['6, 8, 10', '8, 15, 17', '4, 3, 5', '8, 16, 17'], answer: '8, 15, 17' },
      { id: 'm85-t5', prompt: 'If 2m = 12, the other two triplet members are', options: ['5 and 13', '9 and 15', '35 and 37', '16 and 20'], answer: '35 and 37' },
      { id: 'm85-t6', prompt: 'The square root of 729 is', options: ['23', '27', '33', '37'], answer: '27' },
      { id: 'm85-t7', prompt: 'The prime factors of 729 used for its square root are', options: ['Six factors of 3', 'Three factors of 9', 'Two factors of 27', 'Nine factors of 3'], answer: 'Six factors of 3' },
      { id: 'm85-t8', prompt: 'The square root of 2025 is', options: ['35', '40', '45', '55'], answer: '45' },
      { id: 'm85-t9', prompt: 'In the division method for 729, 47 x 7 equals', options: ['280', '329', '349', '729'], answer: '329' },
      { id: 'm85-t10', prompt: 'A remainder of zero in the division method means', options: ['The root is 0', 'The number is a perfect square', 'You must add a decimal', 'The first digit was wrong'], answer: 'The number is a perfect square' },
      { id: 'm85-t11', prompt: 'A perfect square cannot end with exactly', options: ['One zero', 'Two zeros', 'Four zeros', 'Zero zeros'], answer: 'One zero' }
    ]
  }
};

function withLevel(item, level) {
  return item.level ? item : { ...item, level };
}

export function class8Chapter(moduleId) {
  const chapter = CLASS8_CHAPTERS[moduleId];
  if (!chapter) return null;
  const extra = CLASS8_EXTRA[moduleId] || { solve: [], test: [] };
  const solve = [...chapter.solve, ...(extra.solve || [])].map((item, index) => (
    withLevel(item, item.core ? (index % 2 === 0 ? 'Medium' : 'Hard') : 'Easy')
  ));
  const test = [...chapter.test, ...(extra.test || [])].map((item, index) => (
    withLevel(item, index < 7 ? 'Easy' : index < 14 ? 'Medium' : 'Hard')
  ));
  return { ...chapter, solve, test };
}
