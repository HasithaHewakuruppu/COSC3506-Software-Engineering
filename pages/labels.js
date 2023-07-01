import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HOME_PAGE, LOGIN_PAGE } from '../utils/routes'
import Spinner from '../components/Spinner'
import { prisma } from '../lib/db'
import { getSession } from 'next-auth/react'
import CreatableSelect from 'react-select/creatable'
import { LEISURE_COLOR, WORK_COLOR, FITNESS_COLOR } from '../utils/colors'

export default function RestrictedPage({ session, alreadyHasLabels }) {
  const [workLabels, setWorkLabels] = useState([])
  const [leisureLabels, setLeisureLabels] = useState([])
  const [fitnessLabels, setFitnessLabel] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function saveLabels() {
    setLoading(true)
    const body = JSON.stringify({
      labels: [...workLabels, ...leisureLabels, ...fitnessLabels],
    })
    try {
      await fetch('/api/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
      router.push(HOME_PAGE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!session) {
      router.push(LOGIN_PAGE)
    }
    if (session && alreadyHasLabels) {
      router.push(HOME_PAGE)
    }
  }, [])

  if (!session || alreadyHasLabels) {
    return <Spinner fullPageSpinner />
  }

  return (
    <div
      className="container-sm my-8"
      style={{
        maxWidth: '1000px',
      }}
    >
      <h1 className="mt-5 mb-3">
        Seems you haven&apos;t set up your labels yet...
      </h1>
      <p className="fw-light">
        Help us decide what&apos;s important in your life
      </p>
      <div className="d-flex flex-column gap-3">
        <div>
          <label className="fs-8 fw-light text-muted">
            Create your work labels:
          </label>
          <LabelPicker
            category="WORK"
            onChange={(options) => {
              setWorkLabels(
                options.map((option) => ({
                  name: option.value,
                  category: 'WORK',
                }))
              )
            }}
          />
        </div>
        <div>
          <label className="fs-8 fw-light text-muted">
            Create your leisure labels:
          </label>
          <LabelPicker
            category="LEISURE"
            onChange={(options) => {
              setLeisureLabels(
                options.map((option) => ({
                  name: option.value,
                  category: 'LEISURE',
                }))
              )
            }}
          />
        </div>
        <div>
          <label className="fs-8 fw-light text-muted">
            Create your fitness labels:
          </label>
          <LabelPicker
            category="FITNESS"
            onChange={(options) => {
              setFitnessLabel(
                options.map((option) => ({
                  name: option.value,
                  category: 'FITNESS',
                }))
              )
            }}
          />
        </div>
      </div>
      <div
        className="d-flex my-5"
        style={{
          height: '48px',
        }}
      >
        <button
          type="button"
          className="btn btn-dark w-100 h-100"
          onClick={() => {
            saveLabels()
          }}
        >
          {loading ? <Spinner /> : 'Create Labels'}
        </button>
      </div>
    </div>
  )
}

function LabelPicker({ category, onChange }) {
  const backgroundColor = getColorForCategory(category)

  return (
    <CreatableSelect
      isClearable
      isMulti
      placeholder={''}
      styles={{
        multiValue: (providedStyles) => ({
          ...providedStyles,
          backgroundColor: backgroundColor,
        }),
      }}
      onChange={(e) => {
        onChange(e)
      }}
    />
  )
}

function getColorForCategory(category) {
  if (category === 'WORK') {
    return WORK_COLOR
  }
  if (category === 'LEISURE') {
    return LEISURE_COLOR
  }
  if (category === 'FITNESS') {
    return FITNESS_COLOR
  }
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  let labels = []
  if (session?.user?.email) {
    labels = await prisma.label.findMany({
      where: {
        userEmail: session?.user?.email,
      },
    })
  }
  return {
    props: {
      session: session ? session : null,
      alreadyHasLabels: labels?.length > 0,
    },
  }
}
