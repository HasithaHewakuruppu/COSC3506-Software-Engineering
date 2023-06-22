export default function Spinner({ fullPageSpinner = false }) {
  return (
    <div
      style={{
        minHeight: fullPageSpinner ? '100vh' : '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="spinner-border" role="status" style={{}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
