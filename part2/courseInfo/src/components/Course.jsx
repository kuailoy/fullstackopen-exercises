const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Course = ({ course }) => {
  const getTotal = () => course.parts.reduce((sum, item) => sum + item.exercises, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={getTotal()} />
    </div>
  )
}

export default Course
